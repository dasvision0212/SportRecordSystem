module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                backend: 'https://ntuim.cjiso.ninja/'
            };

        case 'production':
            return {
                backend: 'https://ntuim.cjiso.ninja/'
            };

        default:
            return {
                backend: '0.0.0.0'
            };
    }
};