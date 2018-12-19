
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Colors from '../../global/Colors';

const ICON_SIZE = 24;
const iconMake = (name) => {
    return ({ focused, tintColor }) => { return (<Icon name={name} size={ICON_SIZE} color={focused ? Colors.NAVI_ACTIVE_TINT_COLOR : Colors.NAVI_DEFAULT_TINT_COLOR} />); }
}

export {
    iconMake
}