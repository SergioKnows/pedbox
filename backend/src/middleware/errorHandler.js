// Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: err.message
    });
};

// Middleware para rutas no encontradas
export const notFound = (req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        message: `La ruta ${req.originalUrl} no existe`
    });
};