import React from "react";
import "./styles.scss";
import { Table, Row, Button, Icon, Pagination } from "antd";
import moment from "moment";
export default class TransactionTable extends React.Component {
  onChange = value => {
        console.log (value)
  }
  render() {
    const { transactions, pagination } = this.props.data;
    const { page, total, limit } = pagination;

    const columns = [
      {
        width: "35%",
        title: "Buyer",
        dataIndex: "name",
        key: "name",
        render: (name, record) => (
          <div>
            <div>{name}</div>
            <div>{record.dest}</div>
          </div>
        )
      },
      {
        width: "65%",
        title: "Transaction Info",
        dataIndex: "date",
        key: "date",
        render: (date, record) => (
          <div>
            <div>{record.qty + (record.qty > 1 ? " pieces" : " piece")}</div>
            <div>{moment(date).format("llll")}</div>
          </div>
        )
      }
    ];
    return (
      <div>
        <Row className="product-detail-transaction-table-title">
          <span style={{ fontSize: 16, fontWeight: 400, color: "black" }}>
            Transaction History
          </span>
          <div className="product-detail-transaction-table-statics">
            <span>{pagination.total + " transactions. "}</span>
            <Button size="small">
              <span>Sort By Latest</span>
              <Icon type="arrow-down" />
            </Button>
          </div>
        </Row>
        <Table className = "product-detail-transaction-table" columns={columns} dataSource={transactions} pagination={false} />
        <Row className="product-detail-transaction-table-pagination">
          <Pagination
            size={"small"}
            current={page}
            showQuickJumper
            total={total}
            onChange = {this.onChange}
          />
        </Row>
      </div>
    );
  }
}
