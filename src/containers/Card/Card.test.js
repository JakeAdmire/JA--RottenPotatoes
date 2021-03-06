import React from 'react';
import { shallow } from 'enzyme';

import { Card, mapDispatchToProps } from './Card';
import { setCard } from '../../actions';

describe('Card', () => {

  let wrapper;

  const mockSetCard = jest.fn();
  const mockProps = {
    name: 'TACO BELL',
    address: '123 STREET ST. DENVER, CO',
    distance: 23.2113,
    id: 1,
    inspectionscore: 25,
    violationtype: 'critical',
    correctPlaces: [{}, {}, {}]
  }

  beforeEach(() => {
    wrapper = shallow (
      <Card {...mockProps}
            setCard={mockSetCard} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should return the proper value when buildTitle is invoked', () => {
    let buildTitle = wrapper.instance().buildTitle(mockProps.name);
    expect(buildTitle).toEqual("Taco Bell");
  })

  it('should return the proper value when buildDistance is invoked', () => {
    let buildDistance = wrapper.instance().buildDistance(mockProps.distance);
    expect(buildDistance).toEqual("23.2m away");
  })

  it('should return the proper value when buildAddress is invoked', () => {
    let buildAddress = wrapper.instance().buildAddress(mockProps.address);
    expect(buildAddress).toEqual("123 Street St. DENVER, Co");
  })

  it('should dispatch setCard when handleClick is invoked', () => {
    wrapper.instance().handleClick();
    expect(mockSetCard).toBeCalled();
  })

  describe('mapDispatchToProps', () => {

    it('should dispatch setRestaurants when its prop is called', () => {
      let mockCard = {};
      const mockDispatch = jest.fn();
      const actionToDispatch = setCard(mockCard);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCard(mockCard);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })  

  })
  
})