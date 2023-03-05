import * as Cesium from 'cesium';


export default class CMap {
    private static instance: Cesium.Viewer;
    static getInstance() {
        if (!this.instance) {
            // this.token = 'fbb3d591b56170206085f43c4d83e37d';
            this.instance = new Cesium.Viewer('cesiumContainer',{
                animation: false,   // 动画控制控件
                shouldAnimate: true,
                homeButton: true,
                geocoder: true,
                baseLayerPicker: false,
                timeline: false,
                fullscreenButton: true,
                sceneModePicker: true,
                infoBox: true,
                navigationHelpButton: false,
                navigationInstructionsInitiallyVisible: false,
                selectionIndicator: false,
                // bottomContainer: false,
                // creditContainer: '',    // 版权显示
                // terrainProvider: new Cesium.ArcGISTiledElevationTerrainProvider({
                //     url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
                //     token: 'KED1aF_I4UzXOHy3BnhwyBHU4l5oY6rO6walkmHoYqGp4XyIWUd5YZUC1ZrLAzvV40pR6gBXQayh0eFA8m6vPg'
                // }),
                //高德
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
                    minimumLevel: 3,
                    maximumLevel: 18
                }),

                //ArcGis
                // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                //     url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                // })
                // 无效
                // imageryProvider: {
                //     url: `http://t0.tianditu.gov.cn/img_w/wmts?tk=${this.tk}`,
                //     subdomains: ['0','1','2','3','4','5','6','7'],
                //     layer: 'tdImageLayer',
                //     style: 'default',
                //     format: 'image/jpeg',
                //     tileMatrixSetID: 'tileMatrixSetID',
                //     show: true
                // }
            })
            // 高德注记
            this.instance.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
                minimumLevel: 3,
                maximumLevel: 18
            }));
            // 高德矢量
            // this.instance.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            //     url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            //     minimumLevel: 3,
            //     maximumLevel: 18
            // }))
            // this.instance.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            //     // 影像注记
            //     url: 'http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' + this.token,
            //     subdomains: this.subdomains,
            //     layer: 'tdtCiaLayer',
            //     style: 'default',
            //     format: 'image/jpeg',
            //     tileMatrixSetID: 'GoogleMapsCompatible',
            //     show: true
            //   }))
            // this.instance.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            //     url: `http://t0.tianditu.gov.cn/cia_w/wmts?tk=${this.tk}`,
            //     subdomains: ['0','1','2','3','4','5','6','7'],
            //     layer: 'tdImageLayer',
            //     style: 'default',
            //     format: 'image/jpeg',
            //     tileMatrixSetID: 'tileMatrixSetID',
            //     show: true
            // }))
            //ArcGIS 街道图
            // this.instance.imageryLayers.addImageryProvider(new Cesium.ArcGisMapServerImageryProvider({
            //     url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
            // }))
            //ArcGIS 蓝色图
            // this.instance.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
            //     url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            // }))
            // 去除底部的ion标记
            (this.instance.cesiumWidget.creditContainer as HTMLElement).style.display = "none";
            this.instance.clock.currentTime = Cesium.JulianDate.addHours(this.instance.clock.currentTime,8,new Cesium.JulianDate());
        }
        return this.instance;
    }
}