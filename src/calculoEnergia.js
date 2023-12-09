

function ejecutarCalculoGeneracionVoltaica(event, valorMedio) {
    event.preventDefault();
    const eficienciaSistema = parseFloat(document.getElementById("eficiencia_sistema").value) // npv
    const valorMedioRadiacion = parseFloat(valorMedio.toFixed(2)) // Rk
    const FCpv = (eficienciaSistema * valorMedioRadiacion ) / 8760
    // Demanda de energía de energia
    const preDemandaAnualEnergia = document.getElementById("demanda_anual_ener").value
    const preDemandaDiariaEnergia = document.getElementById("demanda_diaria_ener").value
    let demandaEnergia;  
    if(preDemandaDiariaEnergia !== '' && preDemandaAnualEnergia === '')
    {
      demandaEnergia = parseFloat(preDemandaDiariaEnergia) * 365
    }
    else if(preDemandaAnualEnergia !== '' && preDemandaDiariaEnergia === '')
    {
      demandaEnergia = parseFloat(preDemandaAnualEnergia)
    }
    else
    {
      alert("Ingrese una demanda de energia anual o diaria")
      return
    }

    const demandaAnualEnergia = demandaEnergia
    const Ppv = demandaAnualEnergia / (parseFloat(FCpv) * 8760)
    const PpvKw = (parseFloat(Ppv)/1000).toFixed(2)
    const FPpv = parseFloat(document.getElementById("factor_planta").value)
    const Gkwh = PpvKw * FPpv * 8760
    const generacionEnergia = parseFloat(Gkwh.toFixed(2)) 

    // Factor de capacidad
    const tituloResultadoFC = document.getElementById("titulo_factor_capacidad")
    const resultadoFC = document.getElementById("resultado_factor_capacidad")
    tituloResultadoFC.innerHTML = "Factor de capacidad"
    resultadoFC.innerHTML = `${FCpv.toFixed(2)}`
    // Potencia Fotovoltáica  
    const tituloPotencia = document.getElementById("titulo_potencia")
    const potencia = document.getElementById("resultado_potencia")
    tituloPotencia.innerHTML = "Potencia Fotovoltáica:"
    potencia.innerHTML = `${PpvKw} kW`
    // Generación anual de energía
    const tituloResultadoGen = document.getElementById("titutlo_generacion")
    const resultadoGen = document.getElementById("resultado_generacion")
    tituloResultadoGen.innerHTML = "Generación anual de energía"
    resultadoGen.innerHTML = `${generacionEnergia} kWh`

    // Número de paneles y área requerida

    const potenciaPanel = parseFloat(document.getElementById("potencia_panel").value)

    if(potenciaPanel){

      const numeroPaneles = Math.ceil(PpvKw / potenciaPanel)
      const areaRequerida = parseFloat(numeroPaneles * 2 * 1.7)

      const tituloResultadoPaneles = document.getElementById("titulo_paneles")
      const resultadoPaneles = document.getElementById("resultado_paneles")
      const tituloResultadoArea = document.getElementById("titulo_area")
      const resultadoArea = document.getElementById("resultado_area")
      // Resultados
      tituloResultadoPaneles.innerHTML = "Número de paneles:"
      resultadoPaneles.innerHTML = `${numeroPaneles}`
      tituloResultadoArea.innerHTML = "Área requerida:"
      resultadoArea.innerHTML = `${areaRequerida} m2`
    }

    const contenedorResultados = document.getElementById("resultado_foto")
    contenedorResultados.style.display = "block"
  }

function ejecutarCalculoGeneracionEolica50(event, valorMedio) {
    event.preventDefault();
    
    // Calculo potencia
    const coeficienteMaquina = parseFloat(document.getElementById("coef_maquina").value) // CM
    const valorVelocidadViento = parseFloat(valorMedio.toFixed(2)) // Rk
    
    const diametroRotor = parseFloat(document.getElementById("diametro_rotor").value) // DR
    const areaTransversal = (Math.PI * Math.pow(diametroRotor, 2)) / 4 // A
    const potenciaEolica = parseFloat(0.59 * 0.5 * coeficienteMaquina * 1.25 * areaTransversal * Math.pow(valorVelocidadViento, 3)).toFixed(3)/1000 // Pe 

   // Calculo generacion 
    const FP = parseFloat(document.getElementById("factor_planta_eo").value)
    const GeneracionEolica = parseFloat(potenciaEolica * FP * 8760).toFixed(2) / 1000 
  
    // Potencia Eolica  
    const tituloPotenciaEolica = document.getElementById("titulo_potencia_eo")
    const resultadoPotenciaEolica = document.getElementById("resultado_potencia_eo")
    tituloPotenciaEolica.innerHTML = "Potencia Eólica:"
    resultadoPotenciaEolica.innerHTML = `${potenciaEolica.toFixed(3)} kW`

    // Generación de energía
    const tituloResultadoGenEolica = document.getElementById("titutlo_generacion_eo")
    const resultadoGenEolica = document.getElementById("resultado_generacion_eo")
    tituloResultadoGenEolica.innerHTML = "Generación de energía"
    resultadoGenEolica.innerHTML = `${GeneracionEolica.toFixed(3)} MWh/año`

   // Calculo numero aeorogeneradores

   const areaLoteHa = parseFloat(document.getElementById("area_lote").value) // AreaLote
  
    if(areaLoteHa){
      const areaCalculada = 4 * diametroRotor * 6 * diametroRotor 
      const parqueEolico = Math.ceil((areaLoteHa * 10000) / areaCalculada)
      // Calculo potencia parque eolico
      const potenciaParqueEolico = (parqueEolico * potenciaEolica)/1000
      // Calculo generación de energía
      const generacionParqueEolico = potenciaParqueEolico * FP * 8760

      const tituloResultadoAerogen = document.getElementById("titulo_aerogen")
      const resultadoAerogen = document.getElementById("resultado_aerogen")
      tituloResultadoAerogen.innerHTML = "Número de aerogeneradores:"
      resultadoAerogen.innerHTML = `${parqueEolico}`

      const tituloPotenciaParqueEolico = document.getElementById("pot_parque_eolico")
      const resultadoArea = document.getElementById("resultado_pot_parque_eolico")
      tituloPotenciaParqueEolico.innerHTML = "Potencia parque eólico:"
      resultadoArea.innerHTML = `${potenciaParqueEolico.toFixed(3)} MW`

      const tituloGeneracionParqueEolico = document.getElementById("gen_parque_eolico")
      const resultadoGeneracionParqueEolico = document.getElementById("resultado_gen_parque_eolico")
      tituloGeneracionParqueEolico.innerHTML = "Generación parque eólico:"
      resultadoGeneracionParqueEolico.innerHTML = `${generacionParqueEolico.toFixed(3)} MWh/año`
    }

    const contenedorResultadosEolica = document.getElementById("resultado_eolica")
    contenedorResultadosEolica.style.display = "block"
  }

function ejecutarCalculoGeneracionEolica100(event, valorMedio) {
    event.preventDefault();
    // Calculo potencia
    const coeficienteMaquina = parseFloat(document.getElementById("coef_maquina_100").value) // CM
    const valorVelocidadViento = parseFloat(valorMedio.toFixed(2)) // Rk
    const diametroRotor = parseFloat(document.getElementById("diametro_rotor_100").value) // DR
    const areaTransversal = (Math.PI * Math.pow(diametroRotor, 2)) / 4 // A
    const potenciaEolica = parseFloat(0.59 * 0.5 * coeficienteMaquina * 1.25 * areaTransversal * Math.pow(valorVelocidadViento, 3)).toFixed(3)/1000 // Pe 

   // Calculo generacion 
    const FP = parseFloat(document.getElementById("factor_planta_eo_100").value)
    const GeneracionEolica = parseFloat(potenciaEolica * FP * 8760).toFixed(2) / 1000 
  
    // Potencia Eolica  
    const tituloPotenciaEolica = document.getElementById("titulo_potencia_eo_100")
    const resultadoPotenciaEolica = document.getElementById("resultado_potencia_eo_100")
    tituloPotenciaEolica.innerHTML = "Potencia Eólica:"
    resultadoPotenciaEolica.innerHTML = `${potenciaEolica.toFixed(3)} kW`

    // Generación de energía
    const tituloResultadoGenEolica = document.getElementById("titutlo_generacion_eo_100")
    const resultadoGenEolica = document.getElementById("resultado_generacion_eo_100")
    tituloResultadoGenEolica.innerHTML = "Generación de energía"
    resultadoGenEolica.innerHTML = `${GeneracionEolica.toFixed(3)} MWh/año`

   // Calculo numero aeorogeneradores

   const areaLoteHa = parseFloat(document.getElementById("area_lote_100").value) // AreaLote
  
    if(areaLoteHa){
      const areaCalculada = 4 * diametroRotor * 6 * diametroRotor 
      const parqueEolico = Math.ceil(areaLoteHa * 10000 / areaCalculada) 
      // Calculo potencia parque eolico
      const potenciaParqueEolico = (parseFloat(parqueEolico * potenciaEolica).toFixed(2))/1000
      // Calculo generación de energía
      const generacionParqueEolico = potenciaParqueEolico * FP * 8760

      // Número de paneles y área requerida
      const tituloResultadoAerogen = document.getElementById("titulo_aerogen_100")
      const resultadoAerogen = document.getElementById("resultado_aerogen_100")
      tituloResultadoAerogen.innerHTML = "Número de aerogeneradores:"
      resultadoAerogen.innerHTML = `${parqueEolico}`

      const tituloPotenciaParqueEolico = document.getElementById("pot_parque_eolico_100")
      const resultadoArea = document.getElementById("resultado_pot_parque_eolico_100")
      tituloPotenciaParqueEolico.innerHTML = "Potencia parque eólico:"
      resultadoArea.innerHTML = `${potenciaParqueEolico.toFixed(3)} MW`

      const tituloGeneracionParqueEolico = document.getElementById("gen_parque_eolico_100")
      const resultadoGeneracionParqueEolico = document.getElementById("resultado_gen_parque_eolico_100")
      tituloGeneracionParqueEolico.innerHTML = "Generación parque eólico:"
      resultadoGeneracionParqueEolico.innerHTML = `${generacionParqueEolico.toFixed(3)} MWh/año`
    }

    const contenedorResultadosEolica = document.getElementById("resultado_eolica_100")
    contenedorResultadosEolica.style.display = "block"
  }

function manejoEntradaDemanda(entrada) {
    const demandaAnualEnergia = document.getElementById('demanda_anual_ener')
    const demandaDiariaEnergia = document.getElementById('demanda_diaria_ener')

    switch(entrada){

      case 'year':
        if(demandaDiariaEnergia.value === '') {
          demandaDiariaEnergia.value = ''
          demandaDiariaEnergia.disabled = true
        }

        if (demandaAnualEnergia.value === '') {
          demandaDiariaEnergia.disabled = false
        }
        const valor1 = demandaAnualEnergia.value
        break
      
      case 'day':
        if(demandaAnualEnergia.value === '') {
          demandaAnualEnergia.value = ''
          demandaAnualEnergia.disabled = true
        }

        if (demandaDiariaEnergia.value === '') {
          demandaAnualEnergia.disabled = false
        }
        const valor2 = demandaDiariaEnergia.value
        break
      
      default:
        break
    }
  }


window.ejecutarCalculoGeneracionVoltaica = ejecutarCalculoGeneracionVoltaica;
window.ejecutarCalculoGeneracionEolica50 = ejecutarCalculoGeneracionEolica50;
window.ejecutarCalculoGeneracionEolica100 = ejecutarCalculoGeneracionEolica100;
window.manejoEntradaDemanda = manejoEntradaDemanda;
