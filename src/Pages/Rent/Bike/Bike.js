import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes, deleteBike } from "../../../Redux/Actions/bikeActions";
import Header from "../../Shared/Header";
import { Col, Row, Divider, DatePicker, Checkbox, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import Spinner from "../../Shared/Spinner";
import Rent from "../Rent/Rent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const Bike = () => {
  const { bikes } = useSelector((state) => state.bikeReducer);
  const { loading } = useSelector((state) => state.alertReducer);
  const [totalBikes, setTotalBikes] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllBikes());
  }, []);

  React.useEffect(() => {
    setTotalBikes(bikes);
  }, [bikes]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var bike of bikes) {
      if (bike.bookedTimeSlots.length === 0) {
        temp.push(bike);
      } else {
        for (var booking of bike.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(bike);
          }
        }
      }
    }

    setTotalBikes(temp);
  }

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
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
          {totalBikes.map((bike) => {
            return (
              <Col lg={7} sm={24} xs={24}>
                <div className="car p-2 bs1">
                  <img src={bike.image} className="carimg" />

                  <div className="car-content align-items-center justify-content-between">
                    <div className="text-center pl-2">
                      <h3
                        className="fw-bold"
                        style={{
                          color: "orangered",
                          textTransform: "capitalize",
                        }}
                      >
                        {bike.name}
                      </h3>
                      {!user?.role === "admin" && (
                        <p className="mb-2">
                          {" "}
                          Rent Per Day:{" "}
                          <span
                            className="fw-bold"
                            style={{ color: "orangered", fontSize: "18px" }}
                          >
                            {bike.rentPerHour}৳
                          </span>
                        </p>
                      )}
                    </div>

                    {user?.role === "admin" ? (
                      <div className="text-center">
                        <Link to={`/rent/editBike/${bike._id}`}>
                          <EditOutlined
                            className=" me-5"
                            style={{ color: "green", cursor: "pointer" }}
                          />
                        </Link>

                        <Popconfirm
                          title="Are you sure to delete this car?"
                          onConfirm={() => {
                            dispatch(deleteBike({ bikeId: bike._id }));
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </Popconfirm>
                      </div>
                    ) : (
                      <div className="text-center">
                        <button className="btn1 mr-2">
                          <Link to={`/booking/${bike._id}`}>Book Now</Link>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Bike;
