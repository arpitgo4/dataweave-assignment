
import * as moment from 'moment';
import formatcoords from 'formatcoords';

import { getTokenFromLS, getUserFromLS } from './local-storage';
import { parseMomentToUnixTimeStamp } from './utils';


const ONE_DAY = 86400;
const end_timestamp = parseMomentToUnixTimeStamp(moment.now());

const initialState = {
	user: {
		users: undefined,
		misc: { 
			is_loading: true
		}
	},
	auth: {
		token: getTokenFromLS(),
		logged_in_user: getUserFromLS(),
		misc: {
			is_loading: false
		}
	},
	inspections: [],
	misc: {
		companies: [],
		inspection_filters: {
			selected_company: undefined,
			selected_facility: undefined,
			selected_site: undefined,
			selected_site_format: undefined,
			selected_facility_format: undefined,
			end_timestamp,
            start_timestamp: end_timestamp - ONE_DAY,
		},
	},
	notifications: [],				// react-redux-notifications component
};


/**
 * initial state for imagery layout
 */
if (NODE_ENV === 'development') {
	const INSPECTION_DUMMY_IMAGE = `https://cdn.travel2next.com/wp-content/uploads/driving-across-canada-5.jpg`;
	const dummy_inspections = [
		{
			"company":{
				"name": "Gas Producer Inc"
			},
			"site": {
				"name": "Site A",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"facility": {
				"name": "Facility B",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"inspector": {
				"name": "Bob Randolph",
				"company": "ABC Inspections",
				"certification": "N/A"
			},
			"inspection": {
				"date": "10/4/18",
				"time": "4:30 PM",
				"name": "Compressor 15 using illuminator from 3m",
				"image_url": INSPECTION_DUMMY_IMAGE,
				"cam_direction": 180.000000,
				"wind_speed": 10,
				"wind_speed_units": "mph",
				"wind_direction": 15.000000,
				"leaks": [
					{
						"number": 1,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 10.111111,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 2,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 12.444444,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 1,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 10.111111,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 2,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 12.444444,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					}
				]
			}
		},
		{
			"company":{
				"name": "Gas Producer Inc"
			},
			"site": {
				"name": "Site A",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"facility": {
				"name": "Facility B",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"inspector": {
				"name": "Bob Randolph",
				"company": "ABC Inspections",
				"certification": "N/A"
			},
			"inspection": {
				"date": "10/4/18",
				"time": "4:35 PM",
				"name": "Compressor 15 using illuminator from 3m",
				"image_url": INSPECTION_DUMMY_IMAGE,
				"cam_direction": 180.000000,
				"wind_speed": 10,
				"wind_speed_units": "mph",
				"wind_direction": 15.000000,
				"leaks": [
					{
						"number": 1,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 10.111111,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 2,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 12.444444,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					}
				]
			}
		},
		{
			"company":{
				"name": "Gas Producer Co."
			},
			"site": {
				"name": "Site B",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"facility": {
				"name": "Facility C",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"inspector": {
				"name": "Bob Randolph",
				"company": "ABC Inspections",
				"certification": "N/A"
			},
			"inspection": {
				"date": "10/4/18",
				"time": "4:31 PM",
				"name": "Compressor 15 using illuminator from 3m",
				"image_url": INSPECTION_DUMMY_IMAGE,
				"cam_direction": 180.000000,
				"wind_speed": 10,
				"wind_speed_units": "mph",
				"wind_direction": 15.000000,
				"leaks": [
					{
						"number": 1,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 10.111111,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 2,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 12.444444,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					}
				]
			}
		},
		{
			"company":{
				"name": "Gas Producer Co."
			},
			"site": {
				"name": "Site B",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"facility": {
				"name": "Facility C",
				"lat": 51.048615,
				"long": -114.070847,
				"lsd": "datum...",
				"uid": "100.16-09-010-09W1.00"
			},
			"inspector": {
				"name": "Bob Randolph",
				"company": "ABC Inspections",
				"certification": "N/A"
			},
			"inspection": {
				"date": "10/4/18",
				"time": "4:41 PM",
				"name": "Compressor 15 using illuminator from 3m",
				"image_url": INSPECTION_DUMMY_IMAGE,
				"cam_direction": 180.000000,
				"wind_speed": 10,
				"wind_speed_units": "mph",
				"wind_direction": 15.000000,
				"leaks": [
					{
						"number": 1,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 10.111111,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 2,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 12.444444,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 1,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 10.111111,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					},
					{
						"number": 2,
						"pressure": 1000.000000,
						"pressure_units": "PSI",
						"mass_rate": 12.444444,
						"mass_rate_units": "g/min",
						"vol_rate": 10.111111,
                		"vol_rate_units": "SLPM"
					}
				]
			}
		},
	]

	initialState.inspections = dummy_inspections.map(inspection => {
		const { site, facility } = inspection;
        site.lat_long = formatcoords(site.lat, site.long).format();
		facility.lat_long = formatcoords(facility.lat, facility.long).format();

		return inspection;
	});
}

export default initialState;