import React from "react";
// REDUX
import { marketOrder } from "../../redux/modules/preview/preview";
import { useDispatch } from "react-redux";
// COMPONENTS
import {
  MainContainer,
  SelectDropdown,
  InputField,
  Button
} from "../../components";
import Grid from "@material-ui/core/Grid";
// STYLES
import styles from "./styles.module.css";

export interface Props {}

const initialState = Object.freeze({
  symbol: "XBTUSD",
  quantity: ""
});

function MarketOrderContainer(props: Props) {
  const dispatch = useDispatch();

  const [state, setState] = React.useState(initialState);

  function submitMarketOrder(event: any) {
    dispatch(marketOrder({ ...state, side: event.target.id }));
  }

  function handleOnChangeNumber(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { id, value } = event.target;
    setState(prevState => ({ ...prevState, [id]: parseFloat(value) }));
  }
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id } = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }
  return (
    <MainContainer label="MarkerOrder">
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={3}>
          <SelectDropdown
            instruments={["XBTUSD", "ETHUSD", "XRPUSD"]}
            id="symbol"
            onChange={handleOnChange}
            label="Instrument"
          />
        </Grid>
        <Grid item xs={3}>
          <InputField
            onChange={handleOnChangeNumber}
            value={state.quantity}
            label="Quantity"
            id="quantity"
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            id="Buy"
            variant="custom"
            className={styles.button_buy}
            onClick={submitMarketOrder}
            disabled={!state.quantity}
          >
            MARKET Buy
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            id="Sell"
            variant="custom"
            className={styles.button_sell}
            onClick={submitMarketOrder}
            disabled={!state.quantity}
          >
            MARKET Sell
          </Button>
        </Grid>
      </Grid>
    </MainContainer>
  );
}
export { MarketOrderContainer };
