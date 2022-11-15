
import { List } from './styles';
import CurrencyItem from '../CurrencyItem';

export default function CurrencyList(props) {
  return (
    <List>
      {props.currencies.map(currency => {
        return (
          <CurrencyItem key={currency.InstrumentId} currency={currency} />
        )
      })}
    </List>
  )
}
