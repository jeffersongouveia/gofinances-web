import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import Header from '../../components/Header'
import api from '../../services/api'
import formatValue from '../../utils/formatValue'

import { Container, CardContainer, Card, TableContainer } from './styles'

import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import total from '../../assets/total.svg'

interface Transaction {
  id: string
  title: string
  value: number
  formattedValue: string
  formattedDate: string
  type: 'income' | 'outcome'
  category: { title: string }
  created_at: Date
}

interface Balance {
  income: string
  outcome: string
  total: string
}

interface ResponseProps {
  transactions: Transaction[]
  balance: Balance
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)

  function formatTransaction(transaction: Transaction): Transaction {
    const formattedDate = dayjs(transaction.created_at).format('DD/MM/YYYY')
    let formattedValue = formatValue(transaction.value)

    if (transaction.type === 'outcome') {
      formattedValue = `- ${formattedValue}`
    }

    return { ...transaction, formattedValue, formattedDate }
  }

  async function loadTransactions(): Promise<void> {
    const { data } = await api.get<ResponseProps>('/transactions')

    setTransactions(data.transactions.map(formatTransaction))
    setBalance(data.balance)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <>
      <Header />

      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>

            <h1 data-testid="balance-income">{formatValue(balance.income)}</h1>
          </Card>

          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>

            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome)}
            </h1>
          </Card>

          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>

            <h1 data-testid="balance-total">{formatValue(balance.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Dashboard
