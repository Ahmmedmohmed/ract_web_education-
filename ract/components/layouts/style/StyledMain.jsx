import styled from "styled-components";

const StyledMain = styled.main`
    /* background-color: var(--color-grey-50); */
    /* padding: 4rem 4.8rem 6.4rem; */
    padding: 4rem 3rem 6.4rem;
    overflow: auto;
    /* start max 767px */

    @media (max-width: 767px) {
        padding: 2rem 2.8rem 3.4rem;
    }
`;

export default StyledMain;
