import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
	slug,
	name,
	imageSrc,
	price,
	salePrice,
	releaseDate,
	numOfColors,
}) => {
	// There are 3 variants possible, based on the props:
	//   - new-release
	//   - on-sale
	//   - default
	//
	// Any shoe released in the last month will be considered
	// `new-release`. Any shoe with a `salePrice` will be
	// on-sale. In theory, it is possible for a shoe to be
	// both on-sale and new-release, but in this case, `on-sale`
	// will triumph and be the variant used.
	// prettier-ignore
	const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
				{variant === "new-release" && (
					<Flag variant={variant}>Just released!</Flag>
				)}
				{variant === "on-sale" && (
					<Flag variant={variant}>Sale</Flag>
				)}
				<ImageWrapper>
					<Image alt="" src={imageSrc} />
				</ImageWrapper>
				<Spacer size={12} />
				<Row>
					<Name>{name}</Name>
					<Price className={variant === "on-sale" ? "on-sale" : ""}>
						{formatPrice(price)}
					</Price>
				</Row>
				<Row>
					<ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
					{variant === "on-sale" && (
						<SalePrice>{formatPrice(salePrice)}</SalePrice>
					)}
				</Row>
			</Wrapper>
		</Link>
	);
};

const Link = styled.a`
	text-decoration: none;
	color: inherit;
	flex: 1 1 250px;

	&:last-of-type {
		flex: 1 1 auto;
	}
`;

const Flag = styled.p`
	background-color: ${({ variant }) =>
		variant === "new-release"
			? COLORS.secondary
			: variant === "on-sale"
			? COLORS.primary
      : "transparent"};
      position: absolute;
      right: -4px;
      top: 12px;
      color: ${COLORS.white};
      z-index: 2;
      padding: 8px;
      font-weight: 700;
      font-size: .85rem;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
	position: relative;
`;

const Image = styled.img`
	width: 100%;
`;

const Row = styled.div`
	font-size: 1rem;
	display: flex;
`;

const Name = styled.h3`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.gray[900]};
	flex: 1;
`;

const Price = styled.span`
	&.on-sale {
		text-decoration: line-through;
	}
`;

const ColorInfo = styled.p`
	color: ${COLORS.gray[700]};
	flex: 1;
`;

const SalePrice = styled.span`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.primary};
`;

export default ShoeCard;
