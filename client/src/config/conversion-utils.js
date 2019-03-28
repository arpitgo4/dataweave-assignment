
const pressure_converions_info = {
    psi: {
        psi: 1,
        kpa: 6.89576,
        bar: 0.0689476,
    },
}

const mass_rate_conversion_info = {
    'g/min': {
        'g/min': 1.000000,
        'kg/hr': 0.060000,
        'kg/day': 1.440000,
        'tonne/month': 0.043800,
        'tonne/year': 0.525600,
    },
};

const volume_rate_conversion_info = {
    slpm: {
        slpm: 1.000000,
        slph: 60.000000,
        'scm/day': 1.440000,
        'scm/month': 43.200000,
        'scm/yr': 15768.0000,
        scfh: 2.118882,
        'scf/day': 50.853168,
        'scf/yr': 18561.406320,
    },
};

export const convert_units = (type, from_unit, to_unit, value) => {
    from_unit = from_unit.toLowerCase();
    to_unit = to_unit.toLowerCase();

    switch (type) {
        case 'pressure': 
            return pressure_converions_info[from_unit][to_unit] * value;
        case 'mass_rate': 
            return mass_rate_conversion_info[from_unit][to_unit] * value;
        case 'vol_rate': 
            return volume_rate_conversion_info[from_unit][to_unit] * value;
        default: alert('invalid conversion type!');
    }
};


/**
 * will initialize to and fro conversion
 * values, based on first rows
 */
(function() {
    fill_values(pressure_converions_info, 'psi');
    fill_values(mass_rate_conversion_info, 'g/min');
    fill_values(volume_rate_conversion_info, 'slpm');
}());

function fill_values(table, major_unit) {
    const keys = Object.keys(table[major_unit]);

    for (const k of keys) {
        if (k === major_unit)
            continue;
    
        if (!table[k])
            table[k] = {};

        for (const i_k of keys) {
            table[k][i_k] = deduce(table, k, i_k, major_unit); 
        }
    }
}

function deduce(table, from_unit, to_unit, major_unit) {
    table[from_unit] = table[from_unit] || {};
    table[to_unit] = table[to_unit] || {};
    
    if (table[from_unit][to_unit])
        return table[from_unit][to_unit];

    if (table[to_unit][from_unit])
        return 1/table[to_unit][from_unit];

    return deduce(table, major_unit, to_unit, major_unit) / deduce(table, major_unit, from_unit, major_unit);
};