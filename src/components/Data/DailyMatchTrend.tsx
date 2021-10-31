//import React from 'react'

import { Form, Formik, Field } from "formik";
import { getDmtInfo } from "../../api/data";
import { GraphValues } from "../../definitions";

export type dmData = {
  graphValue: GraphValues;
  numberOfDays: number;
  percentageChange: string;
  change_choice: string;
};

const initialValues = {
  graphValue: "high",
  numberOfDays: 2,
  percentageChange: 1,
  change_choice: "pctChange",
};

const DailyMatchTrend = () => {
  const handledmtDataSubmit = async (values: any) => {
    try {
      const res = await getDmtInfo({
        ...values,
        numberOfDays: parseInt(values.numberOfDays),
        percentageChange: parseInt(values.percentageChange),
        ticker: "aapl",
      });

      console.log(res.data);
    } catch (error) {}
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handledmtDataSubmit}>
        {() => (
          <Form>
            <section className="flex justify-around items-center pt-4">
              <div className="bor">
                <Field
                  name="graphValue"
                  placeholder="Chart Type"
                  as="select"
                  className="text-gray-600 py-1 px-1 rounded bg-gray-50 w-20"
                >
                  <option value="high">High</option>
                  <option value="low">Low</option>
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </Field>
              </div>

              <div>
                <Field
                  name="numberOfDays"
                  placeholder="Chart Type"
                  as="select"
                  className="text-gray-600 py-1 px-1 rounded bg-gray-50"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                </Field>
              </div>
              <div>
                <Field
                  name="change_choice"
                  as="select"
                  placeholder="Chart Type"
                  className="text-gray-600 py-1 px-1 rounded bg-gray-50"
                >
                  <option value="pctChange">pctChange</option>
                  <option value="actChange">actChange</option>
                </Field>
              </div>

              <div>
                <div className="flex items-center bg-gray-50 rounded">
                  <Field
                    type="text"
                    name="percentageChange"
                    className="rounded w-8 text-gray-600 bg-gray-50 outline-none pl-1.5 py-1 "
                  />
                  <span className="text-gray-600 px-1">%</span>
                </div>
              </div>
            </section>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="border-white border py-2  rounded text-white mx-auto w-24  hover:bg-blue-50 hover:text-gray-600 "
              >
                Plot
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DailyMatchTrend;
