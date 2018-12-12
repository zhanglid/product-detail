import React from "react";
import "./styles.scss";
import {
  List,
  Button,
  Row,
  Col,
  Icon,
  Progress,
  Modal,
  Rate,
  Form,
  Upload,
  Input,
  Select
} from "antd";
import moment from "moment";
import _ from "lodash";
import StarRatings from "react-star-ratings";
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};
const FixedLabel = ({ label, content, ...rest }) => {
  return (
    <div
      className="a-fix-left-grid-col a-col-right"
      style={{ paddingLeft: "0%", float: "left" }}
    >
      <div className="a-fix-left-grid">
        <div className="a-fix-left-grid-inner" style={{ paddingLeft: "60px" }}>
          <div
            className="a-fix-left-grid-col"
            style={{
              color: "black",
              fontWeight: 500,
              width: 60,
              marginLeft: -60,
              float: "left"
            }}
          >
            {label ? label + ": " : ""}
          </div>
          <div
            className="a-fix-left-grid-col a-col-right"
            style={{ paddingLeft: "0%", float: "left" }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
const FeedbackList = ({
  name,
  date,
  feedback,
  rate,
  vote,
  variation,
  isVoted,
  ...rest
}) => (
  <div className="product-detail-feedback-item">
    <div className="product-detail-fb-item-user-info">
      <div>{name}</div>
      <div>
        <Icon
          type="like"
          theme={isVoted ? "filled" : "twoTone"}
          twoToneColor="#08979c"
          style={{ color: "#08979c", cursor: "pointer" }}
        />
        ( {vote} )
      </div>
    </div>
    <div className="product-detail-fb-item-main">
      <StarRatings
        starRatedColor="#fadb14"
        numberOfStars={5}
        name="rating"
        rating={rate}
        starDimension={17}
        starEmptyColor="#e8e8e8"
        starSpacing="2px"
      />
      <span style={{ color: "black" }}> {rate.toFixed(2)} </span>
      <div>
        variation:
        {variation.map(vari => (
          <span style={{ marginRight: 4 }}>{vari}</span>
        ))}
      </div>
      <div>{feedback}</div>
      <div>{moment(date).format("lll")}</div>
    </div>
  </div>
);

const ReviewList = ({ title, url, variation, ...rest }) => (
  <div className="product-detail-review-item">
    <div className="product-detail-review-item-user-info">
      <div style={{ width: 150, height: 150 }}>
        <img style={{ maxWidth: "100%" }} src={url} />
      </div>
    </div>
    <div className="product-detail-review-item-main">
      <div style={{ lineHeight: "17px" }}>{title}</div>
      <div>
        variation:{" "}
        {variation.map(vari => (
          <span style={{ marginRight: 4 }}>{vari}</span>
        ))}
      </div>
    </div>
  </div>
);

async function readFileAsync(file) {
  const readFile = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        resolve(reader.result);
      },
      false
    );
    reader.readAsDataURL(file);
  });
  return readFile;
}

const customRequest = async ({ onSuccess, onError, file }) => {
  const reader = new FileReader();
  try {
    const readFile = await readFileAsync(file);
    onSuccess(file, readFile);
  } catch (err) {
    onError(err);
  }
};
function generateFormData(value) {
  var formData = new FormData();
  Object.keys(value).forEach(key => {
    let data = value[key];
    if (!data) {
      return;
    }

    if (data.fileList) {
      data.fileList.forEach(file => {
        const name = file.name;
        const fileObj = file.originFileObj;
        formData.append(key, fileObj, name);
      });
    } else {
      formData.append(key, data);
    }
  });
  formData.append("rate", 5);
  return formData;
}
export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList: []
    };
  }

  showFeedbackModal = () => {
    this.setState({
      visible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = generateFormData(values);
        this.props.onSubmit && this.props.onSubmit(formData);
        console.log("Received values of form: ", formData, values);
        this.setState({
          visible: false
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleSort = value => {
    console.log(value);
  };

  handleStars = value => {
    console.log(value);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fileList } = this.state;
    const rateDistribution = [
      {
        label: "5 stars",
        percent: "0.9"
      },
      {
        label: "4 stars",
        percent: "0.05"
      },
      {
        label: "3 stars",
        percent: "0.02"
      },
      {
        label: "2 stars",
        percent: "0.02"
      },
      {
        label: "1 stars",
        percent: "0.01"
      }
    ];

    const data = [
      {
        name: "Simon",
        feedback:
          "I've used both the MultiPot and the InstantPot and I prefer the MultiPot. The feature set is stronger than that of the Instant Pot that's at the same price point. The cook times are about the same (haven't timed them with a stop watch side by side, but MultiPot feels as fast).",
        feedbackDate: "2018-10-23T17:43:26.226Z",
        voteCount: 20,
        rate: 5.0,
        variation: ["6p", "black"],
        isVoted: true
      },
      {
        name: "Jerry",
        feedback:
          "I've used both the MultiPot and the InstantPot and I prefer the MultiPot. The feature set is stronger than that of the Instant Pot that's at the same price point. The cook times are about the same (haven't timed them with a stop watch side by side, but MultiPot feels as fast).",
        feedBackDate: "2018-10-24T17:43:26.226Z",
        voteCount: 10,
        rate: 4.0,
        variation: ["6p", "black"],
        isVoted: false
      },
      {
        name: "Dendi",
        feedback:
          "I've used both the MultiPot and the InstantPot and I prefer the MultiPot. The feature set is stronger than that of the Instant Pot that's at the same price point. The cook times are about the same (haven't timed them with a stop watch side by side, but MultiPot feels as fast).",
        feedbackDate: "2018-10-25T17:43:26.226Z",
        voteCount: 30,
        rate: 5.0,
        variation: ["6p", "black"],
        isVoted: false
      }
    ];
    const product = {
      url:
        "https://statics.lettopia.com/wirelessbro-images/5b47ecc5531ff45a35e02871_1533246585185_Hong_group.jpg",
      title:
        "WiFi Smart Plug Mini on market, ASTROPANDA Smart Home Power Control Socket, Remote Control Your Household Equipment from Everywhere, No Hub Required, Works with Amazon Alexa and other smart assistants (4 Packs)",
      variation: ["i5", "balck"]
    };

    return (
      <div>
        <Row
          className="product-detail-transaction-table-title"
          style={{ padding: 0 }}
        >
          <span style={{ fontSize: 16, fontWeight: 400, color: "black" }}>
            Ratings & Reviews
          </span>
        </Row>
        <div className="product-detail-rate-detail">
          <ul className="product-detail-rate-list">
            {rateDistribution.map(rate => (
              <li>
                <FixedLabel
                  label={rate.label}
                  content={
                    <Progress
                      strokeColor="#08979c"
                      strokeWidth={12}
                      percent={rate.percent * 100}
                    />
                  }
                />
              </li>
            ))}
          </ul>
          <div className="product-detail-rate-score">
            <StarRatings
              starRatedColor="#fadb14"
              numberOfStars={5}
              name="rating"
              rating={4.81}
              starDimension={30}
              starEmptyColor="#e8e8e8"
            />
            <span style={{ color: "black" }}> 4.81 / 5.00 </span>
            <div
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 16,
                fontWeight: 400
              }}
            >
              200 Reviews
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <Button onClick={this.showFeedbackModal}>Write A Review</Button>
            </div>
            <Modal
              title="Write Your Review"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={null}
              destroyOnClose={true}
            >
              <Form>
                <Form onSubmit={this.handleOk}>
                  <FormItem>
                    <ReviewList
                      url={product.url}
                      variation={product.variation}
                      title={product.title}
                    />
                  </FormItem>

                  <FormItem label="Rate this product">
                    {getFieldDecorator("rate", {
                      initialValue: 5,
                      rules: [
                        { required: true, message: "Please select your rate!" }
                      ]
                    })(<Rate />)}
                  </FormItem>

                  <FormItem label="Review">
                    {getFieldDecorator("review", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your review!"
                        },
                        {
                          min: 20,
                          message: "Please input at least 20 characters"
                        },
                        {
                          max: 500,
                          message: "Please input no more than 500 characters"
                        }
                      ]
                    })(<TextArea />)}
                  </FormItem>
                  <FormItem label="Add photo ">
                    {getFieldDecorator("upload", {})(
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={this.handleChange}
                        name="upload"
                        customRequest={customRequest}
                      >
                        {fileList.length >= 3 ? null : (
                          <div>
                            <Icon type="plus" />
                            <div className="ant-upload-text">Upload</div>
                          </div>
                        )}
                      </Upload>
                    )}
                  </FormItem>

                  <FormItem>
                    <div style={{ display: "flex" }}>
                      <Button
                        style={{ flexGrow: "1", marginRight: 8 }}
                        onClick={this.handleCancel}
                        type="primary"
                        htmlType="cancel"
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ flexGrow: "1" }}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </FormItem>
                </Form>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="product-detail-feedback-action ">
          <div style = {{display:"flex"}}>
            <div style = {{flexGrow:1}} >
             Filter: <Select
                onChange={this.handleStars}
                size="small"
                defaultValue="all"
                
              >
                <Option value="all">All stars</Option>
                <Option value="5">Five Stars</Option>
                <Option value="4">Four Stars</Option>
                <Option value="3">Three Stars</Option>
                <Option value="2">Two Stars</Option>
                <Option value="1">One Star</Option>
              </Select>
            </div>
            <div style = {{float:"right"}}>
              <Select
                onChange={this.handleSort}
                size="small"
                defaultValue="latest"
              >
                <Option value="early">Sort By Eailest</Option>
                <Option value="latest">Sort By Latest</Option>
              </Select>
            </div>
          </div>
        </div>
        <div className="product-detail-feedback-list-wrap">
          <List>
            {data.map(item => {
              const {
                name,
                feedback,
                feedBackDate,
                rate,
                variation,
                voteCount,
                isVoted
              } = item;
              return (
                <List.Item>
                  <FeedbackList
                    name={name}
                    feedback={feedback}
                    rate={rate}
                    variation={variation}
                    date={feedBackDate}
                    vote={voteCount}
                    isVoted={isVoted}
                  />
                </List.Item>
              );
            })}
          </List>
        </div>
      </div>
    );
  }
}
Feedback = Form.create()(Feedback);
