import React from 'react';
import PropTypes from 'prop-types'
import { Container,
	Row,
	Col,
	ListGroup,
	Button
 } from 'react-bootstrap';
import { PRODUCT_EVENT_NAMES,
	PRODUCT_SHIPPED,
 	PRODUCT_RECEIVED } from "../../../store/constants"
import TokenLink from "../token-page/TokenLink";
import { getPastEvents } from '../../../store/events-helpers'

class WillReceiveTokenItem extends React.Component {
	componentDidMount () {
		getPastEvents(
			this.props.drizzle,
			PRODUCT_EVENT_NAMES,
			{
				[PRODUCT_SHIPPED]: { to: this.props.drizzleState.accounts[0] }
			}
		)
	}

	receive = () => {
		const event = this.props.drizzleState.events.events.find(event => {
			return event.event === PRODUCT_SHIPPED &&
				event.returnValues.tokenId === this.props.tokenId &&
				event.returnValues.to === this.props.drizzleState.accounts[0];
		})
		this.props.drizzle.contracts.Logistic.methods.receive.cacheSend(
			event.returnValues.from,
			this.props.tokenId
		)
	}

	render () {
		const eventShip = this.props.drizzleState.events.events.find(event => {
			return event.event === PRODUCT_SHIPPED &&
				event.returnValues.tokenId === this.props.tokenId &&
				event.returnValues.to === this.props.drizzleState.accounts[0];
		})
		const eventReceive = this.props.drizzleState.events.events.find(event => {
			return event.event === PRODUCT_RECEIVED &&
				event.returnValues.tokenId === this.props.tokenId &&
				event.returnValues.by === this.props.drizzleState.accounts[0];
		})

		if (!eventShip || eventReceive) return null

		return (
			<ListGroup.Item>
				<Container fluid>
				  <Row>
				    <Col md={10}>
							<span className="m-2">
								<TokenLink
									tokenId={this.props.tokenId}
								/>
							</span>
						</Col>
						<Col md={1}>
							<Button
								onClick={this.receive}
								aria-controls="receive-product"
							>
								<span>Receive</span>
							</Button>
						</Col>
				  </Row>
				</Container>

			</ListGroup.Item>
		)
	}
}

WillReceiveTokenItem.propTypes = {
	tokenId: PropTypes.string.isRequired
};

export default WillReceiveTokenItem
