import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../../Redux/Actions/bookingActions";
import { Col, Row } from "antd";

import moment from "moment";
import Header from "../../Shared/Header";
import Spinner from "../../Shared/Spinner";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingReducer);
  const { loading } = useSelector((state) => state.alertReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <Header>
      {loading && <Spinner />}
      <h3 className="text-center mt-2">My Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          {bookings
            .filter((o) => o.user === user._id)
            .map((booking) => {
              return (
                <Row gutter={16} className="bs1 mt-3 text-left">
                  <Col lg={6} sm={24}>
                    <p>
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Total Hours : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per Hour : <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total amount : <b>{booking.totalAmount}</b>
                    </p>
                  </Col>

                  <Col lg={12} sm={24}>
                    <p>
                      Transaction Id : <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>

                  <Col lg={6} sm={24} className="text-right">
                    <img
                      style={{ borderRadius: 5 }}
                      src={booking.car.image}
                      height="140"
                      className="p-2"
                    />
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </Header>
  );
}

export default UserBookings;
