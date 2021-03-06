import React, {Component} from 'react'
import Refresh from "../../../../../shared/img/Refresh.svg";
import {ClipLoader} from "react-spinners";
//import Dygraph from "dygraphs/src/dygraph-custom";
import Dygraph from "dygraphs/src/dygraph";
import moment from "moment";
import API from "../../../../../services/api";
import Singleton from "../../../../../services/Socket";
import connect from "react-redux/es/connect/connect";
import {specifySelectedShiftNo} from "../../../../../shared/utils/Utilities";
import {
    ARTICLE_NAMES,
} from "../../../../../constants/constants";

const override = `
    position: absolute;
    display:block;
    left:45%;
    top: 30%;
    z-index: 100000;
`;

class TemperatureTrendItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tempData: "X\n",
        };

        this.loginData = JSON.parse(localStorage.getItem('logindata'));
        this.role = this.loginData.data.role;
        let token = this.loginData.token;
        this.socket = Singleton.getInstance(token);

        switch (this.role) {
            case 'admin':
                this.apiUrl = 'api/os/tempTrend';
                this.colorArray = ["#71D7BE", "#FEF7DC", "#FF9C64", "#C8DCFC", "#FF71CF", "#8C67F6"];
                //this.labelArray = ["Time", "tempA1", "tempA2", "tempA3", "tempB1", "tempB2",
                // "tempB3"];
                this.labelArray = ["Time", "Actual Top Temp", "Actual Mid Temp", "Actual Bottom Temp", "Setting Top Temp", "Setting Mid Temp", "Setting Bottom Temp"];
                this.seriesOptions = {
                    "Setting Top Temp": {
                        strokeWidth: 3
                    },
                    "Setting Mid Temp": {
                        strokeWidth: 3
                    },
                    "Setting Bottom Temp": {
                        strokeWidth: 3
                    }
                };
                break;
            case 'ip':
                this.apiUrl = 'api/ip/tempTrend';
                this.colorArray = ["#71D7BE", "#FEF7DC", "#FF9C64", "#C8DCFC", "#FF71CF", "#8C67F6", "#449AFF", "#46D6EA"];
                this.labelArray = ["Time", "Actual L.Top Temp", "Actual L.Bottom Temp", "Actual" +
                " R.Top Temp", "Actual R.Bottom Temp", "Setting L.Top Temp", "Setting L.Bottom" +
                " Temp", "Setting R.Top Temp", "Setting R.Bottom Temp"];
                this.seriesOptions = {
                    "Setting L.Top Temp": {
                        strokeWidth: 3
                    },
                    "Setting L.Bottom Temp": {
                        strokeWidth: 3
                    },
                    "Setting R.Top Temp": {
                        strokeWidth: 3
                    },
                    "Setting R.Bottom Temp": {
                        strokeWidth: 3
                    },
                };
                break;
            case 'os':
                this.apiUrl = 'api/os/tempTrend';
                this.colorArray = ["#71D7BE", "#FEF7DC", "#FF9C64", "#C8DCFC", "#FF71CF", "#8C67F6"];
                //this.labelArray = ["Time", "tempA1", "tempA2", "tempA3", "tempB1", "tempB2",
                // "tempB3"];
                this.labelArray = ["Time", "Actual Top Temp", "Actual Mid Temp", "Actual Bottom Temp", "Setting Top Temp", "Setting Mid Temp", "Setting Bottom Temp"];
                this.seriesOptions = {
                    "Setting Top Temp": {
                        strokeWidth: 3
                    },
                    "Setting Mid Temp": {
                        strokeWidth: 3
                    },
                    "Setting Bottom Temp": {
                        strokeWidth: 3
                    }
                };
                break;
            default:
                this.apiUrl = 'api/os/tempTrend';
                this.colorArray = ["#71D7BE", "#FEF7DC", "#FF9C64", "#C8DCFC", "#FF71CF", "#8C67F6"];
                //this.labelArray = ["Time", "tempA1", "tempA2", "tempA3", "tempB1", "tempB2",
                // "tempB3"];
                this.labelArray = ["Time", "Actual Top Temp", "Actual Mid Temp", "Actual Bottom Temp", "Setting Top Temp", "Setting Mid Temp", "Setting Bottom Temp"];
                this.seriesOptions = {
                    "Setting Top Temp": {
                        strokeWidth: 3
                    },
                    "Setting Mid Temp": {
                        strokeWidth: 3
                    },
                    "Setting Bottom Temp": {
                        strokeWidth: 3
                    }
                };
                break;
        }
        this.state = {
            loading: true
        };
    }


    legendFormatter = (data) => {
        let text = '';
        if (data.xHTML) {
            text = data.xHTML + "<br/>";
        }
        let series = data.series;
        let numberOfTemp = this.colorArray.length;
        for (let i = 0; i < numberOfTemp; i++) {
            if (series[i].y) {
                text += "<span style='color:   " + series[i].color + ";'>" + series[i].label + ": </span>" + series[i].y + "&nbsp; &nbsp; &nbsp;";
            }
            if (i == (numberOfTemp / 2 - 1)) {
                text += "<br/>";
            }
        }

        //console.log("stationId: ", this.props.stationId);

        if (document.getElementById("tooltip" + this.props.stationId)) {
            document.getElementById("tooltip" + this.props.stationId).innerHTML = text;
        }

        let html = "";
        return html;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            this.setState({loading: true});
            let {stationId} = this.props;
            let {startDate, endDate} = this.props.globalDateFilter;
            let newFromTimeDevice = moment(startDate.toISOString()).unix();
            let newToTimeDevice = moment(endDate.toISOString()).unix();
            let isSelectedShiftChange = this.props.globalShiftFilter.selectedShift != prevProps.globalDateFilter.selectedShift;

            let newSelectedArticle = this.props.globalArticleFilter.selectedArticle;
            let articleKey = '';
            if (newSelectedArticle) {
                articleKey = newSelectedArticle[0] === ARTICLE_NAMES.keys().next().value ? '' : newSelectedArticle[0];
            }

            if (this.fromTimeDevice != newFromTimeDevice || this.toTimedevice != newToTimeDevice) {
                this.fromTimeDevice = newFromTimeDevice;
                this.toTimedevice = newToTimeDevice;
                let param = {
                    "idStation": stationId,
                    /*"from_timedevice": this.fromTimeDevice,
                    "to_timedevice": this.toTimedevice*/
                    "from_timedevice": this.fromTimeDevice,
                    "to_timedevice": this.toTimedevice,
                    "shiftno": 0,
                    "modelname": '',
                    "articleno": articleKey
                };
                console.log("174");
                console.log("param: ", param);
                console.log("this.apiUrl: ", this.apiUrl);
                API(this.apiUrl, 'POST', param)
                    .then((response) => {
                        console.log("response 179: ", response);
                        if (response.data.success) {
                            let dataArray = response.data.data;
                            let displayData = '';
                            if (dataArray[0].data) {
                                displayData = JSON.parse(dataArray[0].data.replace('],[]', ']]'));
                            }
                            this.graph.updateOptions(
                                {
                                    'file': displayData,
                                },
                            );
                            this.setState({loading: false});
                        } else {
                            this.graph.updateOptions(
                                {
                                    'file': [],
                                },
                            );
                            this.setState({loading: false});
                        }
                    })
                    .catch((err) => console.log('err:', err, "stationId: ", stationId));
            } else if (isSelectedShiftChange) {
                let selectedShift = this.props.globalShiftFilter.selectedShift;
                selectedShift = specifySelectedShiftNo(selectedShift);
                this.fromTimeDevice = newFromTimeDevice;
                this.toTimedevice = newToTimeDevice;
                let param = {
                    "idStation": stationId,
                    /*"from_timedevice": this.fromTimeDevice,
                    "to_timedevice": this.toTimedevice*/
                    "from_timedevice": this.fromTimeDevice,
                    "to_timedevice": this.toTimedevice,
                    "shiftno": selectedShift,
                    "modelname": '',
                    "articleno": articleKey
                };
                console.log("217");
                console.log("param: ", param);
                console.log("this.apiUrl: ", this.apiUrl);
                API(this.apiUrl, 'POST', param)
                    .then((response) => {
                        console.log("response: ", response);
                        try {
                            let dataArray = response.data.data;
                            let displayData = '';
                            displayData = JSON.parse(dataArray[0].data);
                            this.displayData = displayData;
                            this.graph.updateOptions(
                                {
                                    'file': displayData,
                                },
                            );
                        } catch (e) {
                            console.log("Error: ", e);
                            this.graph.updateOptions(
                                {
                                    'file': [],
                                },
                            );
                        }
                        this.setState({loading: false});
                    })
                    .catch((err) => console.log('err:', err, "stationId: ", stationId));
            }
        }
    }

    componentDidMount() {
        let {stationId} = this.props;

        //this.drawLegend();

        let {startDate, endDate} = this.props.globalDateFilter;
        this.fromTimeDevice = moment(startDate.toISOString()).unix();
        this.toTimedevice = moment(endDate.toISOString()).unix();
        let selectedShift = this.props.globalShiftFilter.selectedShift;
        selectedShift = specifySelectedShiftNo(selectedShift);

        let newSelectedArticle = this.props.globalArticleFilter.selectedArticle;
        let articleKey = '';
        if (newSelectedArticle) {
            articleKey = newSelectedArticle[0] === ARTICLE_NAMES.keys().next().value ? '' : newSelectedArticle[0];
        }

        let param = {
            "idStation": stationId,
            "from_timedevice": this.fromTimeDevice,
            "to_timedevice": this.toTimedevice,
            "shiftno": selectedShift,
            "modelname": '',
            "articleno": articleKey
        };

        let myInteractions = Object.assign({}, Dygraph.defaultInteractionModel, {
            dblclick: (event, g, context) => {
                if (this.graph){
                    this.graph.resetZoom();
                    this.graph.updateOptions({
                        valueRange: [100, 180],
                    });
                }
            }
        });

        let displayData = "X\n";
        this.graph = new Dygraph(
            document.getElementById('station' + stationId),
            displayData,
            {
                // options go here. See http://dygraphs.com/options.html
                //https://stackoverflow.com/questions/20234787/in-dygraphs-how-to-display-axislabels-as-text-instead-of-numbers-date
                animatedZooms: true,
                showLabelsOnHighlight: true,
                width: 590,
                height: 200,
                labels: this.labelArray,
                colors: this.colorArray,
                series: this.seriesOptions,
                axes: {
                    x: {
                        drawGrid: false,
                        valueFormatter: function (x) {
                            return moment.unix(x).format("DD/MM/YYYY HH:mm:ss");
                        },
                        axisLabelFormatter: function (x) {
                            return moment.unix(x).format("DD/MM/YYYY HH:mm:ss");
                        },
                    },
                    y: {
                        axisLineColor: '#464d54',
                        valueRange: [100, 180],
                        //drawAxis: false,
                    }
                },
                //labelsDiv: `lengendLabel` + stationId,
                legendFormatter: this.legendFormatter,
                labelsShowZeroValues: false,
                interactionModel: myInteractions,
            }
        );
        console.log("313");
        console.log("this.apiUrl: ", this.apiUrl);
        console.log("param: ", param);
        API(this.apiUrl, 'POST', param)
            .then((response) => {
                console.log("response 318: ", response);
                try {
                    let dataArray = response.data.data;
                    displayData = JSON.parse(dataArray[0].data.replace(",[]", "]"));
                    this.graph.updateOptions(
                        {
                            'file': displayData,
                            strokeWidth: '20px',
                        },
                    );
                } catch (e) {
                    console.log("Error: ", e);
                    this.graph.updateOptions(
                        {
                            'file': [],
                            strokeWidth: '20px',
                        },
                    );
                }
                this.setState({loading: false});
            })
            .catch((err) => console.log('err:', err, "stationId: ", stationId));
    }

    refresh = () => {
        this.graph.resetZoom();
        this.graph.updateOptions({
            dateWindow: null,
            valueRange: null
        });
        this.graph.updateOptions({
            valueRange: [100, 180],
        });
    };

    render() {
        let {stationId} = this.props;
        return (
            <div className="col">
                <div className="row" style={{marginTop: 30}}>
                    <div className="col-11">
                        <h4 className="float-left">STATION {stationId}: USL/ Value/ LSL</h4>
                    </div>
                    <div className="col-1">
                        <img className="float-right" src={Refresh} style={{width: '50%'}}
                             onClick={this.refresh}/>
                    </div>
                </div>
                <div className="row">
                    <ClipLoader
                        css={override}
                        sizeUnit={"px"}
                        size={100}
                        color={'#30D4A4'}
                        loading={this.state.loading}
                        margin-left={300}
                    />
                    <div className="container" style={{marginBottom: 40}}>
                        <div className="row">
                            <div id={'tooltip' + stationId}
                                 className="temperature-tooltip"
                                 style={{position: 'absolute'}}>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div id={'station' + stationId} style={{marginBottom: 50}}>
                            </div>
                        </div>
                    </div>
                    {/*<div className="container" style={{marginBottom: 40}}>
                        <div className="row">
                            <div style={{position: 'absolute'}} id={'lengendLabel' + stationId}> </div>
                        </div>
                    </div>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    globalDateFilter: state.globalDateFilter,
    globalShiftFilter: state.globalShiftFilter,
    globalArticleFilter: state.globalArticleFilter,
});

export default connect(mapStateToProps)(TemperatureTrendItem);
