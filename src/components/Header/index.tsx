import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Container } from './styles'

import Logo from '../../assets/logo.svg'

interface HeaderProps {
  size?: 'small' | 'large'
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const history = useHistory()

  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(history.location.pathname)
  }, [history])

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />

        <nav>
          <Link to="/" className={currentPath === '/' ? 'selected' : ''}>
            Listagem
          </Link>

          <Link
            to="/import"
            className={currentPath === '/import' ? 'selected' : ''}
            data-testid="import"
          >
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  )
}

export default Header
