import React, { useContext } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'

import TablePagination from './TablePagination'

import ChainContext, { Transaction } from '../../contexts/Chain'
import { getTransactions } from '../../services/UILayer'

const cols = [
  {
    label: 'date',
    index: 'date',
  },
  {
    label: 'amount(ckb)',
    index: 'value',
  },
  {
    label: 'transaction hash',
    index: 'hash',
  },
]

const formatterDate = (time: Date) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d} ${date.toTimeString().substr(0, 8)}`
}

const transactionsToHistory = (transactions: Transaction[]) =>
  transactions.map((tx: Transaction) => ({
    ...tx,
    date: formatterDate(tx.date),
  }))

const History = () => {
  const chain = useContext(ChainContext)
  const { pageNo, pageSize, totalCount, items } = chain.transactions

  return (
    <Container>
      <h1>History</h1>
      <Table striped bordered>
        <thead>
          <tr>
            {cols.map(col => (
              <th key={col.index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactionsToHistory(items).map((txHistory: { [index: string]: string | number }) => (
            <tr key={txHistory.hash}>
              {cols.map(col => (
                <td key={col.index}>{txHistory[col.index]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col>
          <TablePagination
            currentPage={pageNo}
            pageSize={pageSize}
            total={totalCount}
            onChange={page => getTransactions(page, pageSize)}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default History
