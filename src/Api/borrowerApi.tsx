import { useState } from "react";
import axios from "axios";
import { numberToWordsInRupees } from "../utils";
import useLoading from "../templates/loading"; // Custom hook import
import moment from "moment";

// Custom hook definition
export const useBorrowerAPI = () => {
  const [error, setError] = useState<string | null>(null);
  const { startLoading, endLoading } = useLoading(); // Correct usage of useLoading

  const addNewBorrower = async (value: any) => {
    const url = `API/addBorrowerAPI`;
    startLoading();
    try {
      value.inRupees = numberToWordsInRupees(
        Number(Math.ceil(value.loadAmount + (value.loadAmount * 18) / 100))
      );
      value.userId = 111;
      value.accountNumber = 1234567890;
      value.intrest = Math.ceil((value.loadAmount * 18) / 100);
      value.totalAmount = Math.ceil(
        value.loadAmount + (value.loadAmount * 18) / 100
      );
      value.balanceAmount = Math.ceil(
        value.loadAmount + (value.loadAmount * 18) / 100
      );

      const data = { data: value };

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      endLoading();
      return response.data;
    } catch (error) {
      endLoading();
      setError("Error saving borrower data");
      console.error("Error saving borrower:", error);
      return null;
    }
  };

  const findBorrower = async (value: any, selectedOption: string) => {
    startLoading();
    console.log("value", value, selectedOption);

    const url = `API/findBorrowerAPI/${
      selectedOption === "mobileNumber" || selectedOption === "accountNumber"
        ? Number(value)
        : value
    }/${selectedOption}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      endLoading();
      return response.data.data;
    } catch (error) {
      endLoading();
      setError("Error fetching borrower data");
      console.error("Error fetching borrower:", error);
      return null;
    }
  };

  const upadateBorrower = async (id: string, value: number) => {
    console.log(id);
    const url = `API/updateBorrowerAmt`;
    startLoading();
    try {
      const data = {
        id: id,
        amountSettled: [
          {
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            amount: value,
          },
        ],
      };
      console.log(data);
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      endLoading();
      return response.data;
    } catch (error) {
      endLoading();
      setError("Error saving borrower data");
      console.error("Error saving borrower:", error);
      return null;
    }
  };


  const getStats = async (from:string, to: string) => {
    startLoading();
    const url = `API/getStatsAPI/${from}/${to}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      endLoading();
      return response.data;
    } catch (error) {
      endLoading();
      setError("Error fetching borrower data");
      console.error("Error fetching borrower:", error);
      return null;
    }
  };

  return { upadateBorrower, addNewBorrower, findBorrower, error , getStats};
};
