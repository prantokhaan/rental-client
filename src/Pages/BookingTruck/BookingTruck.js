import React, { useState, useEffect } from "react";
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import Header from "../Shared/Header";
import Spinner from "../Shared/Spinner";
import { getAllTrucks } from "../../Redux/Actions/truckActions";
import moment from "moment";
import { bookTruck } from "../../Redux/Actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCars } from "../../Redux/Actions/carActions";
import { getAllBikes } from "../../Redux/Actions/bikeActions";
const { RangePicker } = DatePicker;

const BookingTruck = ({ match }) => {
  const { trucks } = useSelector((state) => state.truckReducer);
  const { cars } = useSelector((state) => state.carReducer);
  const { bikes } = useSelector((state) => state.bikeReducer);

  const { loading } = useSelector((state) => state.alertReducer);
  const [truck, setTruck] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { truckId } = useParams();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (trucks.length === 0 || cars.length === 0 || bikes.length === 0) {
      dispatch(getAllTrucks());
      dispatch(getAllCars());
      dispatch(getAllBikes());
    } else {
      setTruck(trucks.find((o) => o._id == truckId) || cars.find(o => o._id == truckId || bikes.find(o => o._id == truckId)));
    }
  }, [trucks, cars, bikes]);

  useEffect(() => {
    setTotalAmount(totalHours * truck.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      truck: truck._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookTruck(reqObj));
  }
  const handleInput = (e) => {
    const input = e.target.value;
    setCoupon(input)
  }
  const handleDiscount = (e) => {
    if(coupon === "newuser"){
      setTotalAmount(totalAmount - totalAmount * 0.1)
      setDiscount(totalAmount * 0.1)
    }
  }
  return (
    <div>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={truck.image}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="100"
            alt="truck"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right mt-5 pb-5">
          <Divider type="horizontal" dashed>
            Truck Info
          </Divider>
          <div style={{ textAlign: "center" }}>
            <h2>{truck.name}</h2>
            <h5>
              <span className="fw-bold">{truck.rentPerHour}$</span> Rent Per
              hour
            </h5>
            <h5>
              <span className="fw-bold">{truck.engine}</span>
            </h5>
            <Divider />
            <h6>
              GVW : <strong>{truck.gvw} KG</strong>
            </h6>
            <h6>
              Horsepower : <strong>{truck.horsepower} HP</strong>
            </h6>
            <h6>
              Torque : <strong>{truck.torque} NM</strong>
            </h6>
            <h6>
              Body Length : <strong>{truck.body} CM</strong>
            </h6>
            <h6>
              Brake Type : <strong>{truck.brake}</strong>
            </h6>
            <h6>
              Fuel Capacity : <strong>{truck.fuel} Ltr</strong>
            </h6>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{truck.rentPerHour}</b>
              </p>

              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <div className="mb-3">
                <input
                  type="text"
                  className="p-2"
                  style={{ border: "2px solid orangered" }}
                  onBlur={handleInput}
                />
                {discount === 0 ? (
                  <button
                    onClick={handleDiscount}
                    className="secondary-button ms-2"
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    disabled
                    className="secondary-button ms-2"
                  >
                    Apply
                  </button>
                )}
              </div>
              <h3>
                Total Amount :{" "}
                <span style={{ color: "orangered" }}>{totalAmount}</span>
              </h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="inr"
                amount={totalAmount * 100}
                stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>

        {truck.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {truck.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </div>
  );
};

export default BookingTruck;
