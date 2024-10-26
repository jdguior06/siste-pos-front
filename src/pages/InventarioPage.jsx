import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const InventarioPage = () => {
    console.log("cargando almacenes");
    const dispatch = useDispatch();
    const { idAlmacen } = useParams();
    console.log('idAlmacen:', idAlmacen);
}

export default InventarioPage;




