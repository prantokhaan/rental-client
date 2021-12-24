import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrucks } from "../../Redux/Actions/truckActions";
import Header from "../Shared/Header";
import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import Spinner from "../Shared/Spinner";
const { RangePicker } = DatePicker;

const Truck = () => {
  const { trucks } = useSelector((state) => state.truckReducer);
  const { loading } = useSelector((state) => state.alertReducer);
  const [totalTrucks, setTotalTrucks] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllTrucks());
  }, []);

  React.useEffect(() => {
    setTotalTrucks(trucks);
  }, [trucks]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var truck of trucks) {
      if (truck.bookedTimeSlots.length === 0) {
        temp.push(truck);
      } else {
        for (var booking of truck.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(truck);
          }
        }
      }
    }

    setTotalTrucks(temp);
  }

  return (
    <div>
      <Row className="mt-3 text-center" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
            style={{ color: "orangered" }}
          />
        </Col>
      </Row>

      {loading === true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalTrucks.map((truck) => {
          return (
            <Col lg={7} sm={24} xs={24}>
              <div className="car p-2 bs1">
                <img src={truck.image} className="carimg" />

                <div className="car-content align-items-center justify-content-between">
                  <div className="text-center pl-2">
                    <h3
                      className="fw-bold"
                      style={{
                        color: "orangered",
                        textTransform: "capitalize",
                      }}
                    >
                      {truck.name}
                    </h3>
                    <p className="mb-2">
                      {" "}
                      Rent Per Day:{" "}
                      <span
                        className="fw-bold"
                        style={{ color: "orangered", fontSize: "18px" }}
                      >
                        {truck.rentPerHour}৳
                      </span>
                    </p>
                  </div>

                  <div className="text-center">
                    <button className="btn1 mr-2">
                      <Link to={`/booking/${truck._id}`}>Book Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Truck;
