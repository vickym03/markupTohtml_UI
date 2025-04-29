import React, { useState } from "react";
import { Container } from "./styles";
import DailyCollection from "./weeklyCollection";
import Navigation from "../../navigation";

function AddUser() {
  const [render, setRender] = useState<number | null>(null);

  const stateRender = () => {
    switch (render) {
      case 1:
        return <DailyCollection close={() => setRender(null)} />;
      case 2:
        return;
      default:
        return null;
    }
  };
  return (
    <React.Fragment>
      {render === null && (
        <span>
          <Container>
            <Navigation />
            <p className="heading">Add New Borrower</p>
            <div className="groupBtn">
              <button className="btn" onClick={() => setRender(1)}>
              Weekly Collection
              </button>
              <button
                className="btn"
                // onClick={() => setRender(2)}
              >
                Monthly Collection
              </button>
            </div>
          </Container>
        </span>
      )}
      {stateRender()}
    </React.Fragment>
  );
}

export default AddUser;
