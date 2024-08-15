import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Select,
  MenuItem,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "../../components/layout/Layout";
import ProductsTable from "../../components/productsTable/ProductTable";
import { paths } from "../../_lib/constants";
import {
  resetCart,
  RootState,
  setBillingOptions,
  setShippingAddress,
  setShippingOptions,
} from "../../_lib/redux/store";

import styles from "./checkout.module.scss";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.value);
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      label: "Billing",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
      Element: Billing,
    },
    {
      label: "Shipping",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
      Element: Shipping,
    },
    {
      label: "Summary",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
      Element: Summary,
    },
  ];

  useEffect(() => {
    if (!cart.length) navigate(paths.root);
  }, [cart.length, navigate]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleEnd = () => {
    dispatch(resetCart());
    navigate(paths.books);
  };
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Checkout</h1>
        <Stepper
          sx={{ maxWidth: 500 }}
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((step, index) => {
            const Element = step.Element as () => JSX.Element;
            return (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Element />

                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    {index > 0 ? (
                      <Button
                        variant="outlined"
                        className={styles.nextButton}
                        sx={{ margin: "1rem 0" }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant="contained"
                      className={styles.nextButton}
                      sx={{ margin: "1rem 0" }}
                      onClick={handleNext}
                    >
                      {index === steps.length - 1 ? "Place Order" : "Next"}
                    </Button>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Order placed! You'll be contacted soon.</Typography>
            <Button onClick={handleEnd} sx={{ mt: 1, mr: 1 }}>
              See More Books
            </Button>
          </Paper>
        )}
      </div>
    </Layout>
  );
}

function Billing() {
  const options = useSelector(
    (state: RootState) => state.checkout.billing.options
  );
  const dispatch = useDispatch();

  const selectOption = (title: string) => {
    const tempOption = options.map((option) => {
      if (option.title === title) return { ...option, selected: true };
      else return { ...option, selected: false };
    });
    dispatch(setBillingOptions(tempOption));
  };

  return (
    <div className={styles.billing}>
      <h3>Set Payment Method</h3>
      <Select
        variant="standard"
        onChange={(e) => selectOption(e.target.value)}
        defaultValue={options.find((option) => option.selected)?.title}
      >
        {options.map((option) => (
          <MenuItem key={option.title} value={option.title}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

function Shipping() {
  const address = useSelector(
    (state: RootState) => state.checkout.shipping.address
  );
  const options = useSelector(
    (state: RootState) => state.checkout.shipping.options
  );
  const dispatch = useDispatch();

  const selectOption = (title: string) => {
    const tempOption = options.map((option) => {
      if (option.title === title) return { ...option, selected: true };
      else return { ...option, selected: false };
    });
    dispatch(setShippingOptions(tempOption));
  };

  return (
    <div className={styles.shipping}>
      <h3>Set Shipping</h3>
      <TextField
        label="Address"
        value={address}
        variant="standard"
        onChange={(e) => dispatch(setShippingAddress(e.target.value))}
      />
      <Select
        variant="standard"
        onChange={(e) => selectOption(e.target.value)}
        defaultValue={options.find((option) => option.selected)?.title}
      >
        {options.map((option) => (
          <MenuItem key={option.title} value={option.title}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

function Summary() {
  const shippingAddress = useSelector(
    (state: RootState) => state.checkout.shipping.address
  );
  const shippingOptions = useSelector(
    (state: RootState) => state.checkout.shipping.options
  );
  const billingOptions = useSelector(
    (state: RootState) => state.checkout.billing.options
  );
  const cart = useSelector((state: RootState) => state.cart.value);
  const data = cart.map((elem) => {
    return {
      id: elem.item.id,
      title: elem.item.title,
      price: elem.item.price,
      quantity: elem.quantity,
      image: elem.item.image,
    };
  });

  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const includeShipping =
    shippingOptions.find((val) => val.selected)?.title === "Express Delivery" &&
    cart.length;

  return (
    <div className={styles.summary}>
      <div>
        <h3>Summary</h3>
        <ProductsTable
          products={data}
          totalAmount={totalAmount as string}
          includeShipping={includeShipping as boolean}
        />
      </div>
      <div className={styles.shippingAndPayment}>
        <div>
          <h4>Shipping Address</h4>
          <p>{shippingAddress}</p>
        </div>
        <div>
          <h4>Payment Method</h4>
          <p>{billingOptions.find((val) => val.selected)?.method}</p>
        </div>
      </div>
    </div>
  );
}
