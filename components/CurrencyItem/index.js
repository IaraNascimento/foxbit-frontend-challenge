
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Wrap, Header, Image, VariationBadge, Name, Value, Label, Volume } from './styles';

export default function CurrencyItem(props) {

  const [currencyData, setCurrencyData] = useState({});

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
        setCurrencyData(data);
      }

      // UPDATES TO SUBSCRIBELEVEL1
      if (channel === 'Level1UpdateEvent') {
        setCurrencyData(data);
      }
    });
  }, []);

  return (
    <Wrap>
      <Header>
        <Image src={'https://statics.foxbit.com.br/icons/colored/' + props.currency.Product1Symbol.toLowerCase() + '.svg'} />
        {currencyData.Rolling24HrPxChange ?
          <VariationBadge value={currencyData.Rolling24HrPxChange}>{currencyData.Rolling24HrPxChange.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</VariationBadge> :
          <Loading />
        }
      </Header>
      <Name>{props.currency.Product1Symbol}</Name>
      {currencyData.LastTradedPx ?
        <Value>R$ {currencyData.LastTradedPx.toLocaleString('pt-br', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</Value> :
        <Loading />
      }
      <Label>Volume (24h):</Label>
      {currencyData.Rolling24HrVolume ?
        <Volume>
          {currencyData.Rolling24HrVolume.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          {' '}
          {props.currency.Product1Symbol}
        </Volume> :
        <Loading />
      }
    </Wrap>
  )
}
