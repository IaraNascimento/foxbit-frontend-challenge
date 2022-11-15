import styled from 'styled-components';

export const Wrap = styled.div`
background-color: white;
position: relative;
padding: 24px 20px;
border-radius: 16px;
width: 136px;
height: 136px;
`;

export const Header = styled.header`
display: flex;
`;

export const VariationBadge = styled.div`
background: ${props => props.value >= 0 ? 'green' : 'red'}
`;

export const Image = styled.img`
max-width: 28px;
max-height: 28px;
`;