
import { useEffect, useState } from 'react';
import { Wrap, Header, Image, VariationBadge } from './styles';

export default function CurrencyItem(props) {

  const [currency, setCurrency] = useState(props.currency);

  useEffect(() => {
    const ws = new WebSocket('wss://api.foxbit.com.br/');

    ws.addEventListener('open', () => {
      const payload = {
        m: 0,
        i: 2,
        n: 'SubscribeLevel1',
        o: JSON.stringify({ InstrumentId: props.currency.InstrumentId }),
      }
      ws.send(JSON.stringify(payload));
    });

    ws.addEventListener('message', function message(response) {
      const { n, o } = JSON.parse(response.data);
      const channel = n; // GetInstruments | SubscribeLevel1 | Level1UpdateEvent
      const data = JSON.parse(o);

      // FIRST RESPONSE
      if (channel === 'SubscribeLevel1') {
        setCurrency({ ...currency, ...data });
        console.log(data);
      }

      // UPDATES TO SUBSCRIBELEVEL1
      if (channel === 'Level1UpdateEvent') {
        setCurrency({ ...currency, ...data });
        console.log(data);
      }
    });
  }, []);

  return (
    <Wrap>
      <Header>
        <Image src={'https://statics.foxbit.com.br/icons/colored/' + currency.Product1Symbol.toLowerCase() + '.svg'} />
        <VariationBadge value={currency.Rolling24HrPxChange}>{currency.Rolling24HrPxChange}</VariationBadge>
      </Header>
      {currency.Product1Symbol}
    </Wrap>
  )
}
