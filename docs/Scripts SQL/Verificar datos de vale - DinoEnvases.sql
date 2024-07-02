USE DinoEnvases2;
GO

DECLARE @NRO_VALE	AS VARCHAR(20);
DECLARE @USUARIO	AS VARCHAR(20);


--	EL USUARIO SE DEBE DEJAR EN NULL SI NO SE QUIERE FILTRAR

--	EL ID DEL VALE ES UNA CLAVE COMPUESTA, CONFORMADA DE LA SIGUIENTE MANERA:
--	SQL_ID-NRO_VALE
SET @NRO_VALE	= '71308903';
SET @USUARIO    = 'mcastillo';


--	CABECERA DEL VALE

SELECT	Vale.Id AS 'ID VALE',
		Vale.NombreUsuario AS 'USUARIO', 
		Vale.NroSucursal AS 'SUCURSAL TIPRE', 
		Vale.NroTransaccion AS 'NRO TRANSACCION', 
		Vale.NrtoTkFiscal AS 'NRO TICKET', 
		Vale.PVFiscal AS 'NRO PV', 
		Vale.TipoTkFiscal AS 'NRO TIPO TICKET',
		estado.Descripcion AS 'ESTADO'
FROM Vale vale
	INNER JOIN EstadoVale estado WITH(NOLOCK) ON estado.Id = Vale.IdEstadoVale
WHERE vale.Id LIKE '%-' + @NRO_VALE AND (vale.NombreUsuario = @USUARIO OR @USUARIO = NULL) 


--	ITEMS DEL VALE

SELECT  detalle.id AS 'ID',
		detalle.IdVale AS 'VALE ID',
		envase.Descripcion AS 'DESCRIPCION',
		envase.Codigo AS 'CODIGO',
		detalle.Cantidad AS 'CANTIDAD INGRESADA'

FROM	DetalleVale detalle
	INNER JOIN Envase envase WITH(NOLOCK) ON envase.Id = detalle.IdEnvase
WHERE detalle.IdVale LIKE '%-' + @NRO_VALE
ORDER BY detalle.Codigo DESC