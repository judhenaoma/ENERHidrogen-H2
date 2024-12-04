import { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class GraficoTorta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: this.props.datos,
            titulo : this.props.titulo,
			fuente : this.props.fuente
        }
		
        console.log(this.state.datos)
    }

	componentDidUpdate(prevProps) {
        // Verifica si las propiedades han cambiado
        if (
            prevProps.datos !== this.props.datos ||
            prevProps.titulo !== this.props.titulo ||
            prevProps.fuente !== this.props.fuente
        ) {
            // Actualiza el estado con las nuevas propiedades
            this.setState({
                datos: this.props.datos,
                titulo: this.props.titulo,
                fuente: this.props.fuente
            });
        }
    }

	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: this.state.titulo
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: this.state.datos
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			<p className='text-center w-full mt-4'><i>{this.state.fuente}</i></p>
		</div>
		);
	}
}