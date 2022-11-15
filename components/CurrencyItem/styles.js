import styled from 'styled-components';

const fontXXXS = '10px';
const fontXXS = '12px';
const fontSM = '16px';
const fontMD = '20px';

export const Wrap = styled.div`
background-color: white;
position: relative;
padding: 24px 20px;
border-radius: 16px;
width: 136px;
`;

export const Header = styled.header`
display: flex;
align-items: flex-start;
justify-content: space-between;
margin-bottom: 4px;
`;

export const VariationBadge = styled.div`
background: ${props => props.value >= 0 ? '#EBFAF4' : '#FCEDED'};
color: ${props => props.value >= 0 ? '#214739' : '#5C3030'};
font-size: ${fontXXS};
line-height: ${fontXXS};
border-radius: 12px;
padding: 4px 8px;
`;

export const Image = styled.img`
max-width: 28px;
max-height: 28px;
`;

export const Name = styled.p`
font-size: ${fontSM};
line-height: ${fontSM};
margin: 0 0 8px 0;
`;

export const Value = styled.p`
white-space: nowrap;
font-size: ${fontMD};
line-height: ${fontMD};
margin: 0 0 20px 0;
`;

export const Label = styled.p`
font-size: ${fontXXXS};
line-height: ${fontXXXS};
margin: 0 0 4px 0;
color: rgb(111, 112, 117);
`;

export const Volume = styled.p`
font-size: ${fontXXS};
line-height: ${fontXXS};
margin: 0;
`;
