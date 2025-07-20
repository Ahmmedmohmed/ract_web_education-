import styled from "styled-components";

const AppStyledLayout = styled.div`
    display: grid;
    /* grid-template-columns: 26rem 1fr; */
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;

    /* height: 100vh; */
    min-height: 100dvh;
    position: relative;
    /* scroll-behavior: smooth;
    overflow-y: scroll; */

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export default AppStyledLayout;
