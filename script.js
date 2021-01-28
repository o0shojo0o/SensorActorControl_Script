////////// ToDo //////////
// 
// - Colortemp handling
// - Color handling
// - NightTime handling 
// - TimeOut (PIR) handling 
//////////////////////////

// Define actors
const Actors = [
    // eg. {name: '', id: '', on: '', ct: '', color: '', pos:'', posMin: 0, posMax: 100, bri: '', briMin:0, briMax: 100},
    //Flur
    {name: 'FL.Licht.Decke.Hinten', id: 'zigbee.0.0017880102a096e5'},
    {name: 'FL.Licht.Decke.Vorne', id: 'zigbee.0.0017880102eebc0b'},
    {name: 'FL.Licht.Decke', id: 'zigbee.0.group_2'},
    {name: 'FL.Licht.Links', id: 'zigbee.0.84182600000c6dfd'},
    // Küche
    {name: 'KU.Licht.Deckenleuchte', id: 'zigbee.0.group_1', briMin: 1},
    {name: 'KU.Licht.Deckenleuchte.1', id: 'zigbee.0.842e14fffe2304a1', briMin: 1},
    {name: 'KU.Licht.Deckenleuchte.2', id: 'zigbee.0.588e81fffee3b050', briMin: 1},
    {name: 'KU.Licht.Deckenleuchte.3', id: 'zigbee.0.588e81fffed3eddd', briMin: 1},
    {name: 'KU.Licht.Arbeitsplatte', id: 'zigbee.0.group_3'},
    {name: 'KU.Licht.Arbeitsplatte.Links',  id: 'zigbee.0.7cb03eaa00b1a4bf'},
    {name: 'KU.Licht.Arbeitsplatte.Rechts', id: 'zigbee.0.84182600000c9c50'},
    // Wohnzimmer
    {name: 'WZ.Licht.Fensterbank', id: 'zigbee.0.84182600000c77dd'},
    {name: 'WZ.Licht.StandLampe', id: 'zigbee.0.588e81fffedb8b1a', briMin: 1},    
    // Kinderzimmer
    {name: 'KZ.Licht.Betthimmel', id: 'zigbee.0.8418260000101f8c'},
    {name: 'KZ.Licht.Disco', id: 'zigbee.0.841826000010328a'},
    {name: 'KZ.Licht.Decke', id: 'zigbee.0.842e14fffe1f08e7', briMin: 1},   
    // Schlafzimmer
    {name: 'SZ.Licht.Bett', id: 'zigbee.0.588e81fffefea724'},
    {name: 'SZ.Blind.Links', id: 'zigbee.0.680ae2fffe974af1', posMax: 90},
    {name: 'SZ.Blind.Rechts', id: 'zigbee.0.680ae2fffe54a2ba', posMax: 90},
    // Terrasse
    {name: 'TR.Licht.GardenPole', id: 'zigbee.0.7cb03eaa00a9572e', briMin: 1},   
    // Büro
    {name: 'BU.Blind', id: 'zigbee.0.680ae2fffeed55f6', posMax: 97},
];
 
// Define sensors
const Sensors = [
    // eg. {name: '', id: ''},
    //Flur
    {name: 'FL.Sensor.Taster.UP.Hinten', id: 'zigbee.0.5c0272fffe3f3d82'},
    {name: 'FL.Sensor.Taster.UP.Vorne', id: 'zigbee.0.5c0272fffe3f3f29'},
    // Küche
    {name: 'KU.Sensor.Taster', id: 'zigbee.0.00158d00027bd7e1'},
    {name: 'KU.Sensor.PIR', id: 'zigbee.0.00158d000276e21e'},
    // Büro
    {name: 'BU.Sensor.Taster.Free', id: 'zigbee.0.00158d00027c1027'},
    {name: 'BU.Sensor.Taster.OpenClose', id: 'zigbee.0.680ae2fffeaca6fa'},
    // Kinderzimmer
    {name: 'KZ.Sensor.Taster', id: 'zigbee.0.00158d00027c1ca4'},
    {name: 'KZ.Sensor.Taster.UP', id: 'zigbee.0.5c0272fffe3c2124'},
    {name: 'KZ.Sensor.Fernbedienung', id: 'zigbee.0.ec1bbdfffea53484'},
    // Wohnzimmer
    {name: 'WZ.Sensor.Fernbedienung', id: 'zigbee.0.00178801080cf9f9'},
    // Schlafzimmer
    {name: 'SZ.Sensor.Taster.OpenClose', id: 'zigbee.0.680ae2fffe549bb6'},
];
 
// Definde events
const Events = [
    // eg.  {sensor: '', events: ['',''], actors: ['',''], action: ''}, current available [ toggle, on, off, onForce, offForce, autoDim, dimUp, dimDown, open, close, timeOut:sec ]
    // Küche
    {sensor: 'KU.Sensor.Taster', events: ['right_click'], actors: ['KU.Licht.Arbeitsplatte.Links'], action: 'toggle'},
    {sensor: 'KU.Sensor.Taster', events: ['left_click'], actors: ['KU.Licht.Arbeitsplatte.Rechts'], action: 'toggle'},
    {sensor: 'KU.Sensor.Taster', events: ['both_click'], actors: ['KU.Licht.Deckenleuchte'], action: 'toggle'},
    {sensor: 'KU.Sensor.PIR', events: ['occupancy'], actors: ['KU.Licht.Arbeitsplatte.Links'], action: 'on'},
    // Kinderzimmer
    {sensor: 'KZ.Sensor.Taster', events: ['left_click'], actors: ['KZ.Licht.Disco'], action: 'toggle'},
    {sensor: 'KZ.Sensor.Taster', events: ['right_click'], actors: ['KZ.Licht.Betthimmel'], action: 'toggle'},
    {sensor: 'KZ.Sensor.Taster.UP', events: ['state'], actors: ['KZ.Licht.Decke'], action: 'toggle'},
    {sensor: 'KZ.Sensor.Taster.UP', events: ['up_button'], actors: ['KZ.Licht.Decke'], action: 'autoDim'},
    //{sensor: 'KZ.Sensor.Fernbedienung', events: ['on'], actors: ['KZ.Licht.Decke'], action: 'on'},
    //{sensor: 'KZ.Sensor.Fernbedienung', events: ['off'], actors: ['KZ.Licht.Decke'], action: 'off'},
    //{sensor: 'KZ.Sensor.Fernbedienung', events: ['brightness_step_up'], actors: ['WZ.Licht.StandLampe'], action: 'dimUp'},
    //{sensor: 'KZ.Sensor.Fernbedienung', events: ['brightness_step_down'], actors: ['WZ.Licht.StandLampe'], action: 'dimDown'},
    // Schlafzimmer
    {sensor: 'SZ.Sensor.Taster.OpenClose', events: ['cover_open'], actors: ['SZ.Blind.Links', 'SZ.Blind.Rechts'], action: 'open'},
    {sensor: 'SZ.Sensor.Taster.OpenClose', events: ['cover_close'], actors: ['SZ.Blind.Links', 'SZ.Blind.Rechts'], action: 'close'},
    // Büro
    {sensor: 'BU.Sensor.Taster.OpenClose', events: ['cover_open'], actors: ['BU.Blind'], action: 'open'},
    {sensor: 'BU.Sensor.Taster.OpenClose', events: ['cover_close'], actors: ['BU.Blind'], action: 'close'},
    // Wohnzimmer
    {sensor: 'WZ.Sensor.Fernbedienung', events: ['state'], actors: ['WZ.Licht.StandLampe'], action: 'onOff'},
    {sensor: 'WZ.Sensor.Fernbedienung', events: ['up_button', 'up_hold'], actors: ['WZ.Licht.StandLampe'], action: 'dimUp'},
    {sensor: 'WZ.Sensor.Fernbedienung', events: ['down_button', 'down_hold'], actors: ['WZ.Licht.StandLampe'], action: 'dimDown'},
    // Flur
    {sensor: 'FL.Sensor.Taster.UP.Vorne', events: ['state'], actors: ['FL.Licht.Decke'], action: 'toggle'},
    {sensor: 'FL.Sensor.Taster.UP.Vorne', events: ['up_button'], actors: ['FL.Licht.Decke'], action: 'autoDim'},
    {sensor: 'FL.Sensor.Taster.UP.Hinten', events: ['state'], actors: ['FL.Licht.Decke'], action: 'toggle'},
    {sensor: 'FL.Sensor.Taster.UP.Hinten', events: ['up_button'], actors: ['FL.Licht.Decke'], action: 'autoDim'},
];

/////////////////////////////////////////////////// Logic ////////////////////////////////////////////////////////////////////
const cache = [];

// Register events
// Are on or off events actions defined? 
const onOffEvents = Events.filter(x => x.action == 'on' || x.action == 'off');
if (onOffEvents) {
    // Get actor names array from objekt
    const actors = onOffEvents.map(x => x.actors);
    
    // Create array of actor names
    let actorNames = [];
    for (const uKey in actors) {        
        for (const uuKey in actors[uKey]) {     
            actorNames.push(actors[uKey][uuKey])     
        }     
    }
    // Filter actor names of unique
    actorNames = actorNames.filter(onlyUnique);
    // Register event
    for (const key in actorNames) {
        const dataPoint = getDataPoint(actorNames[key], 'on')
        // Init cache object
        if (!cache[actorNames[key]]) {
            cache[actorNames[key]] = {};
            cache[actorNames[key]].state = getState(dataPoint).val;
        }
        on ({id: dataPoint,  change: 'ne'}, (obj) => {            
            cache[actorNames[key]].state = obj.state.val;         
        }); 
    }           
}

// Register events
// Are open or close events (blind) actions defined? 
const openCloseEvents = Events.filter(x => x.action == 'open' || x.action == 'close');
if (openCloseEvents) {
    // Get actor names array from objekt
    const actors = openCloseEvents.map(x => x.actors);
    
    // Create array of actor names
    let actorNames = [];
    for (const uKey in actors) {        
        for (const uuKey in actors[uKey]) {     
            actorNames.push(actors[uKey][uuKey])     
        }     
    }
    // Filter actor names of unique
    actorNames = actorNames.filter(onlyUnique);
    // Register event
    for (const key in actorNames) {  
        on ({id: getDataPoint(actorNames[key], 'pos'),  change: 'ne'}, (obj) => {                                  
            openClose([actorNames[key]], undefined, obj);         
        }); 
    }           
}

// Run through each event definetion
for (const key in Events) {
    const sensor = Sensors.find(x => x.name == Events[key].sensor);
    const events = Events[key].events; 
    
    // Run through each events
    for (const eKey in events) {
        const triggerDp = `${sensor.id}.${events[eKey]}`;
        const actors = Events[key].actors;
        const action = Events[key].action;
        
        // Toogle event register
        if (action == 'toggle') {
            on ({id: triggerDp, val: true}, (obj) => {
                toggle(actors);
            });
        }
    
        // On event register
        else if (action == 'on') {
            on ({id: triggerDp, val: true}, (obj) => {
                setOnOff(actors, true, false);
            });
        } 
        
        // Off event register
        else if (action == 'off') {
            on ({id: triggerDp, val: true}, (obj) => { 
                setOnOff(actors, false, false);
            });
        }

          // On event register
        else if (action == 'onForce') {
            on ({id: triggerDp, val: true}, (obj) => {
                setOnOff(actors, true, true);
            });
        } 
        
        // Off event register
        else if (action == 'offForce') {
            on ({id: triggerDp, val: true}, (obj) => { 
                setOnOff(actors, false, true);
            });
        }

        // OnOff event register
        else if (action == 'onOff') {
            on ({id: triggerDp}, (obj) => { 
                setOnOff(actors, obj.state.val, true);
            });
        }

        // AutoDim event register
        else if (action == 'autoDim') {
            on ({id: triggerDp}, (obj) => { 
                autoDim(actors, obj);
            });
        }

        // DimUp event register
        else if (action == 'dimUp') {
            on ({id: triggerDp, val: true}, (obj) => { 
                dimUpDown(actors, true);
            });
        }

        // DimDown event register
        else if (action == 'dimDown') {
            on ({id: triggerDp, val: true}, (obj) => { 
                dimUpDown(actors, false);
            });
        }

        // Open (Blind) event register
        else if (action == 'open') {
            on ({id: triggerDp, val: true}, (obj) => { 
                openClose(actors, true, undefined);
            });
        }

        // Close (Blind) event register
        else if (action == 'close') {
            on ({id: triggerDp, val: true}, (obj) => { 
                openClose(actors, false, undefined);
            });
        }
    }
}

// Create datapoint string
/**
* @param {string} actorName
* @param {string} control
*/
function getDataPoint(actorName, control) {
    let dataPoint;
    const actor = Actors.find(x=>x.name == actorName)    
    // Has an override been defined?
    if (actor[control] != undefined) {
        dataPoint =  `${actor.id}.${actor[control]}`;        
    }
    else{
        // Zigbee actor
        if (actor.id.startsWith('zigbee')) {
            if (control == 'on') {
                dataPoint =  `${actor.id}.state`;
            }

            else if (control == 'bri') {
                dataPoint = `${actor.id}.brightness`;
            }

            else if (control == 'ct') {
                dataPoint = `${actor.id}.colortemp`;
            }

            else if (control == 'color') {
                dataPoint = `${actor.id}.color`;
            }

            else if (control == 'pos') {
                dataPoint = `${actor.id}.position`;
            }

            else if (control == 'stop') {
                dataPoint = `${actor.id}.stop`;
            }
        }

        // WLED Actor
        else if (actor.id.startsWith('wled')) {
            if (control == 'on') {
                dataPoint = `${actor.id}.on`;
            }
            else if (control == 'bri') {
                dataPoint = `${actor.id}.bri`;
            }

            else if (control == 'color') {
                dataPoint = `${actor.id}.seg.0.col.0_HEX`;
            }
        }

         // WLED Actor
        else if (actor.id.startsWith('sonoff')) {
            if (control == 'on') {
                dataPoint = `${actor.id}.POWER`;
            }            
        }
    }

    if (!existsState(dataPoint)) {
        log(`(${dataPoint}) State: ${control} for Device: ${actor.name} rejected, state not exist!`, 'warn')
        return undefined;
    }
   
    return dataPoint;
}

// On or off function
/**
* @param {string[]} actors
* @param {boolean} onOff
+ @param {boolean} force
*/
function setOnOff(actors, onOff, force) {
    for (const key in actors) {
        const dataPoint = getDataPoint(actors[key], 'on'); 
        if (dataPoint != undefined) {     
            if (force == true) {
                setState(dataPoint, onOff)
                log(`setOnOff force -> set ${actors[key]} of ${onOff}`);
            }
            else {                
                if (cache[actors[key]].state != onOff) {
                    setState(dataPoint, onOff)
                    log(`setOnOff -> set ${actors[key]} of ${onOff}`);
                }
            }
        }
    } 
}
 
// Toggle function
/**
* @param {string[]} actors
*/
function toggle(actors) {
    for (const key in actors) {
        const dataPoint = getDataPoint(actors[key], 'on'); 
        if  (dataPoint != undefined) {
            const currentState = getState(dataPoint).val;
            setState(dataPoint, !currentState);
            log(`toggle -> set ${actors[key]} of ${!currentState}`);
        }
    }
}

/**
* @param {iobJS.ChangedStateObject<any, any>} obj
* @param {string[]} actors
*/
function autoDim(actors, obj) {
    // Check if the cache is available, if not one will be created 
    const cacheKey = JSON.stringify(actors);
    if (!cache[cacheKey]) {
        cache[cacheKey] = {};
        cache[cacheKey].upDimming= true;
        cache[cacheKey].currentBrightness = Number(getState(getDataPoint(actors[0], 'bri')).val);
    }
    
    if (obj.state.val == true) {
        // Create interval
        cache[cacheKey].dimInterval = setInterval(() => {     
            // Dim up       
            if (cache[cacheKey].upDimming == true) {
                cache[cacheKey].currentBrightness = cache[cacheKey].currentBrightness + 10;               
            }   
            // Dim down     
            else{
                cache[cacheKey].currentBrightness = cache[cacheKey].currentBrightness - 10;
            }

            // Check if the current value exceeds the maximum value
            if (cache[cacheKey].currentBrightness > 100) {
                cache[cacheKey].currentBrightness = 100;
                // Auto change dim direction 
                //cache[cacheKey].upDimming = false;
            }
            // Check if the current value is below the minimum value 
            else if (cache[cacheKey].currentBrightness < 10) {
                cache[cacheKey].currentBrightness = 0;
                // Auto change dim direction 
                //cache[cacheKey].upDimming = true;
            }   
            // Set state
            for (const key in actors) {
                const dataPoint = getDataPoint(actors[key], 'bri'); 
                if  (dataPoint != undefined) {
                    let briMin = 0, briMax = 100;
                    // Get actor
                    const actor = Actors.find(x=>x.name == actors[key]);
                    // Has an override been defined?
                    if (actor.briMin) {
                        briMin = actor.briMin;
                    }
                    // Has an override been defined?
                    if (actor.briMax) {
                        briMax = actor.briMax;
                    }
                    // Create reMap 
                    const reMap = createRemap(0, 100, briMin, briMax);
                    // Set state    
                    setState(dataPoint, reMap(cache[cacheKey].currentBrightness));
                    log(`autoDim -> set ${actors[key]} of ${reMap(cache[cacheKey].currentBrightness)}%`);
                }
            } 
        }, 500);
    }    
    else {
        // On release stop dimming 
        clearInterval(cache[cacheKey].dimInterval);
        // On release change dim direction 
        cache[cacheKey].upDimming = !cache[cacheKey].upDimming;
    }
}

/**
* @param {string[]} actors
* @param {boolean} upDown
*/
function dimUpDown(actors, upDown) {
    // Check if the cache is available, if not one will be created 
    const cacheKey = JSON.stringify(actors);
    if (!cache[cacheKey]) {
        cache[cacheKey] = {};
        cache[cacheKey].currentBrightness = Number(getState(getDataPoint(actors[0], 'bri')).val);
    }
    // Dim up   
    if (upDown == true) {
        cache[cacheKey].currentBrightness = cache[cacheKey].currentBrightness + 10;
    }
    // Dim down  
    else{
        cache[cacheKey].currentBrightness = cache[cacheKey].currentBrightness - 10;
    }
    
    // Check if the current value exceeds the maximum value
    if (cache[cacheKey].currentBrightness < 10) {
        cache[cacheKey].currentBrightness = 0;
    }
    // Check if the current value is below the minimum value 
    else if (cache[cacheKey].currentBrightness > 100) {
        cache[cacheKey].currentBrightness = 100;
    }
    // Set state
    for (const key in actors) {
        const dataPoint = getDataPoint(actors[key], 'bri');   
        if  (dataPoint != undefined) {    
            let briMin = 0, briMax = 100;
            // Get actor
            const actor = Actors.find(x=>x.name == actors[key]);
            // Has an override been defined?
            if (actor.briMin) {
                briMin = actor.briMin;
            }
            // Has an override been defined?
            if (actor.briMax) {
                briMax = actor.briMax;
            }
            // Create reMap 
            const reMap = createRemap(0 , 100, briMin, briMax);
            // Set state
            setState(dataPoint, reMap(cache[cacheKey].currentBrightness));
            log(`dimUpDown -> set ${actors[key]} of ${reMap(cache[cacheKey].currentBrightness)}%`);
        }
    } 
}

/**
* @param {string[]} actors
* @param {boolean} openClose
* @param {iobJS.ChangedStateObject<any, any>} eventObj
*/
function openClose(actors, openClose, eventObj) {
    // Run through each actor
    for (const key in actors) {   
        // Get actor
        const actor = Actors.find(x => x.name == actors[key]);  

        // If no cache is defined for the actor name,
        // define cache and register event
        if (!cache[actor.name]) {
            // Define cache object
            cache[actor.name] = {};
            cache[actor.name].posMin = 0;
            cache[actor.name].posMax = 100;
            
            if (openClose != undefined){
                cache[actor.name].openRun = openClose;
                cache[actor.name].closeRun = !openClose;
            }
            else{
                cache[actor.name].openRun = false;
                cache[actor.name].closeRun = false;
            }            

            // Has an override been defined?
            if (actor.posMax) {
                 cache[actor.name].posMax = actor.posMax;
            }
            if (actor.posMin) {
                cache[actor.name].posMin = actor.posMin;
            }            
        }

        // Accept position updates only if they do not come from the JavaScript adapter.
        if (openClose == undefined && !eventObj.state.from.includes('adapter.javascript')) { 
            if (Number(eventObj.state.val) == cache[actor.name].posMin) {
                cache[actor.name].closeRun = false;  
            }
            if (Number(eventObj.state.val) == cache[actor.name].posMax) {
                cache[actor.name].openRun = false;                  
            }
            continue;
        }       

        // Get datapoint
        const dataPoint = getDataPoint(actor.name, 'pos'); 
        const stopDataPoint = getDataPoint(actor.name, 'stop');
        if (stopDataPoint != undefined && dataPoint != undefined && openClose != undefined) {  
            let desiredPos;
            // Open
            if (openClose == true) {
                // Is he already opening?
                if (cache[actor.name].openRun == true) {   
                    cache[actor.name].openRun = false;                 
                    setState(stopDataPoint, true);
                    log(`openClose -> stop ${actors[key]} opening`);
                    continue;
                }
                // Set desired position open
                desiredPos = cache[actor.name].posMax;
                // Set active direction
                cache[actor.name].closeRun = false;  
                cache[actor.name].openRun = true;
            }               
            // Close
            else {
                // Is he already closing?
                if (cache[actor.name].closeRun == true) {   
                    cache[actor.name].closeRun = false;                 
                    setState(stopDataPoint, true);
                    log(`openClose -> stop ${actors[key]} closing`);
                    continue;
                }
                // Set desired position close
                desiredPos = cache[actor.name].posMin;
                // Set active direction
                cache[actor.name].closeRun = true;  
                cache[actor.name].openRun = false;           
            }            
            // Set datapoint
            setState(dataPoint, Number(desiredPos));
            log(`openClose -> set ${actors[key]} of ${desiredPos}%`);
        }
    } 
}

/**
 * Create a function that maps a value to a range
 * @param {Number} inMin Input range minimun value
 * @param {Number} inMax Input range maximun value
 * @param {Number} outMin Output range minimun value
 * @param {Number} outMax Output range maximun value
 * @return {function} A function that converts a value
 */
function createRemap(inMin, inMax, outMin, outMax) {
    return function remaper(x) {
        return Number(((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin).toFixed());
    };
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
