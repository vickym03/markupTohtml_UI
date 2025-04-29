import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import Navigation from "../../navigation";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import { useBorrowerAPI } from "../../Api/borrowerApi";
import DataGrid from "./dataGrid";

function Stats() {
  const { getStats } = useBorrowerAPI();
  const { RangePicker } = DatePicker;
  const [render, setRender] = useState<number | null>(null);
  const [dates, setDates] = useState({
    startDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [statsData, setStatsData] = useState<any | null>(null);

  const onDateChange = (dates: any, dateStrings: any) => {
    if (dates) {
      setDates({
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      });
      getStatsData(dateStrings[0], dateStrings[1]);
    } else {
      setDates({
        startDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      });
    }
  };

  const stateRender = () => {
    switch (render) {
      case 1:
        const paid = statsData.group.paid.borrowers;
        if (paid.length === 0) {
          message.info("No Paid Accounts found");
          setRender(null);
          return null;
        }
        return (
          <DataGrid
            close={() => setRender(null)}
            heading={"Total Paid Accounts"}
            data={paid}
          />
        );
      case 2:
        if (statsData.group.unpaid.borrowers.length === 0) {
          message.info("No unpaid Accounts found");
          setRender(null);
          return null;
        }
        return (
          <DataGrid
            close={() => setRender(null)}
            heading={"Total Unpaid Accounts"}
            data={statsData.group.unpaid.borrowers}
          />
        );
      case 3:
        if (statsData.group.closedAccounts.borrowers.length === 0) {
          message.info("No closed Accounts  found");
          setRender(null);
          return null;
        }
        return (
          <DataGrid
            close={() => setRender(null)}
            heading={"Total Closed Accounts"}
            data={statsData.group.closedAccounts.borrowers}
          />
        );

      case 4:
        if (statsData.group.closedAccounts.borrowers.length === 0) {
          message.info("No closed Accounts  found");
          setRender(null);
          return null;
        }
        return (
          <DataGrid
            close={() => setRender(null)}
            heading={"Total  Accounts"}
            data={statsData.group.totalBorrowers.borrowers}
          />
        );
      default:
        return null;
    }
  };

  const getStatsData = async (startDate: any, endDate: any) => {
    const data = await getStats(startDate, endDate);
    console.log(data);
    if (data && data.message === "Stats fetched successfully") {
      setStatsData(data);
    } else {
      setStatsData(null);
    }
  };
  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf("day");
  };
  
  useEffect(() => {
    getStatsData(dates.startDate, dates.endDate);
  }, []);

  return (
    <React.Fragment>
      {render === null && (
        <span>
          <Container>
            <Navigation />
            <span className="heading">Stats</span>
            <span style={{ padding: "20px" }}>
              <RangePicker
                onChange={onDateChange}
                defaultValue={[
                  dayjs(dates.startDate, "YYYY-MM-DD"),
                  dayjs(dates.endDate, "YYYY-MM-DD"),
                ]}
                disabledDate={disabledDate}
              />
            </span>
            <span>
              {statsData && statsData.stats.length > 0 ? (
                statsData.stats.map((data: any, index: number) => (
                  <div key={index}>
                    <div className="groupBtn">
                      <button
                        className="btn btn-borrowers"
                        onClick={() => setRender(4)}
                      >
                        <span>
                          Total Borrowers : <b>{data.totalBorrowers}</b>
                        </span>
                      </button>

                      <button className="btn btn-lented">
                        <span>
                          Total Amount Lented: <b>{data.totalLoanAmount}</b>
                        </span>
                      </button>

                      <button className="btn btn-collected">
                        <span>
                          Total Collected Amount : <b>{data.totalAmountPaid}</b>
                        </span>
                      </button>

                      <button
                        className="btn btn-closed"
                        onClick={() => setRender(3)}
                      >
                        Total Closed Accounts :{" "}
                        <b>{data.totalClosedAccounts}</b>
                      </button>

                      <button
                        className="btn btn-paid"
                        onClick={() => setRender(1)}
                      >
                        <span>
                          Total Paid Borrowers :{" "}
                          <b>{data.totalPaidBorrowers}</b>
                        </span>
                      </button>

                      <button
                        className="btn btn-unpaid"
                        onClick={() => setRender(2)}
                      >
                        <span>
                          Total Unpaid Borrowers :{" "}
                          <b>{data.totalUnpaidBorrowers}</b>
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center" }}>No data found</div>
              )}
            </span>
          </Container>
        </span>
      )}
      {stateRender()}
    </React.Fragment>
  );
}

export default Stats;
