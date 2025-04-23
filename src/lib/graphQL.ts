import { gql } from "@apollo/client";

const GET_HISTORY = gql`
    query MyQuery($address: String!) {
     Account(where: {id: {_eq: $address}}) {
        id
        transactions(order_by: {timeStamp: desc}) {
            id
            timeStamp
            _tokenOut
            _tokenIn
            _amountOut
            _amountIn
            tokenInDetails {
                decimals
                id
                name
                symbol
            }
            tokenOutDetails {
                decimals
                id
                name
                symbol
            }
        }
  }
}
`;

export default GET_HISTORY;
