import { Button } from "@mui/material";

const Counter = ({ counter, setCounter, agregarAlCarrito, stock }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Button
          disabled={counter <= 1}
          variant="contained"
          onClick={() => setCounter(counter - 1)}
        >
          -
        </Button>
        <h2>{counter}</h2>
        <Button
          disabled={counter >= stock}
          variant="contained"
          onClick={() => setCounter(counter + 1)}
        >
          +
        </Button>
      </div>
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => agregarAlCarrito(counter)}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Counter;
