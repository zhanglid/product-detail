import React from "react";
import "./styles.scss";
import { List, Button, Row, Col, Icon, Input } from "antd";
import moment from "moment";
const FixedLabel = ({ label, content, ...rest }) => {
  return (
    <div
      className="a-fix-left-grid-col a-col-right"
      style={{ paddingLeft: "0%", float: "left" }}
    >
      <div className="a-fix-left-grid">
        <div className="a-fix-left-grid-inner" style={{ paddingLeft: "100px" }}>
          <div
            className="a-fix-left-grid-col"
            style={{
              color: "black",
              fontWeight: 500,
              width: 100,
              marginLeft: -100,
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

const VotePart = ({ voteCount, isVoted, ...rest }) => (
  <div
    className="a-fix-left-grid-col"
    style={{ width: 65, marginLeft: -65, float: "left" }}
  >
    <div style={{ textAlign: "center" }}>{voteCount}</div>
    <div style={{ textAlign: "center" }}>Votes</div>
    <div style={{ textAlign: "center" }}>
      <Icon
        type="like"
        theme={isVoted ? "filled" : "twoTone"}
        twoToneColor="#08979c"
        style={{ color: "#08979c", cursor: "pointer" }}
      />
    </div>
  </div>
);

export default class QuestionAndAnswer extends React.Component {

  render() {
    const { className, ...rest } = this.props;
    const data = [
      {
        question: "Im an instant pot daily user, is this one just as good?",
        answer:
          "I've used both the MultiPot and the InstantPot and I prefer the MultiPot. The feature set is stronger than that of the Instant Pot that's at the same price point. The cook times are about the same (haven't timed them with a stop watch side by side, but MultiPot feels as fast).",
        answeredDate: "2018-10-23T17:43:26.226Z",
        voteCount: 20,
        isOwner: false,
        isVoted: false
      },
      {
        question: "Im an instant pot daily user, is this one just as good?",
        answer:
          "I've used both the MultiPot and the InstantPot and I prefer the MultiPot. The feature set is stronger than that of the Instant Pot that's at the same price point. The cook times are about the same (haven't timed them with a stop watch side by side, but MultiPot feels as fast).",
        answeredDate: "2018-10-24T17:43:26.226Z",
        voteCount: 10,
        isOwner: false,
        isVoted: true
      },
      {
        question: "Im an instant pot daily user, is this one just as good?",
        answer:
          "I've used both the MultiPot and the InstantPot and I prefer the MultiPot. The feature set is stronger than that of the Instant Pot that's at the same price point. The cook times are about the same (haven't timed them with a stop watch side by side, but MultiPot feels as fast).",
        answeredDate: "2018-10-25T17:43:26.226Z",
        voteCount: 30,
        isOwner: true,
        isVoted: false
      }
    ];

    return (
      <div
        {...rest}
        className={"description-area" + (className ? " " + className : "")}
      >
        <Row style={{ padding: 0 }}>
          <Input
            placeholder="Have a question? Search here!"
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Row>
        <Row style={{ padding:16 }}>
          <div style = {{textAlign:"center",color:"black",fontWeight:400,fontSize:20}}> Don't see your answer <Button style = {{marginLeft:16}} >Ask the seller</Button></div>
        </Row>

        <Row
          className="product-detail-transaction-table-title"
          style={{ padding: 0 }}
        >
          <span style={{ fontSize: 16, fontWeight: 400, color: "black" }}>
            Question & Answer
          </span>
        </Row>
        <List>
          {data.map(
            (
              { question, answer, answeredDate, voteCount, isOwner, isVoted },
              index
            ) => {
              return (
                <List.Item>
                  <div className="a-fix-left-grid">
                    <div
                      className="a-fix-left-grid-inner"
                      style={{ paddingLeft: 65 }}
                    >
                      <VotePart voteCount={voteCount} isVoted={isVoted} />
                      <div
                        className="a-fix-left-grid-col a-col-right"
                        style={{ float: "left" }}
                      >
                        <FixedLabel label="Question" content={question} />
                        {isOwner && (
                          <FixedLabel content={<a>Delete your question.</a>} />
                        )}
                        <FixedLabel label="Answer" content={answer} />
                        <FixedLabel
                          content={
                            "By seller on " + moment(answeredDate).format("lll")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </List.Item>
              );
            }
          )}
        </List>
      </div>
    );
  }
}
