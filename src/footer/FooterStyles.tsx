import styled from "styled-components";

export const Box = styled.div`
	background: black;
	bottom: 0;
    left: 0;
	width: 100%;
    position: fixed;

	@media (max-width: 1000px) {
		padding: 70px 30px;
	}
`;

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 96%;
	margin: 0 auto;
	background: #63aa96; 
`;

export const Column = styled.div<{marginLeft?: string}>`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-left: ${props => props.marginLeft ?? "30%"};
`;

export const Row = styled.div`
	display: grid;
	/*grid-template-columns: repeat(
		auto-fill,
        minmax(180px, 1fr)
	);*/
    grid-template-columns:1fr 1fr 1fr;
	grid-gap: 1%;

	@media (max-width: 1000px) {
		grid-template-columns: repeat(
			auto-fill,
			minmax(200px, 1fr)
		);
	}
`;

export const FooterLink = styled.a`
	color: #fff;
	margin-bottom: 0.6em;
	font-size: 18px;
	text-decoration: none;

	&:hover {
		color: green;
		transition: 300ms ease-in;
	}
`;

export const Heading = styled.p`
	font-size: 24px;
	color: #fff;
	margin-bottom: 1em;
	font-weight: bold;
`;
