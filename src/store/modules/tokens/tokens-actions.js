const promises = {}

export default {

    async getTokenByHash( {state, dispatch, commit}, hash){

        if (!hash.length) hash = PandoraPay.config.coins.NATIVE_TOKEN_FULL_STRING_HEX

        if (state.list[hash]) return state.list[hash]
        if (promises[hash]) return promises[hash];
        return promises[hash] = new Promise( async (resolve, reject) => {
            try{
                const tokenData = await PandoraPay.network.getNetworkToken(hash);
                if (!tokenData ) throw "Error getting block info"

                const token = JSON.parse(MyTextDecoder.decode(tokenData) )

                token.hash = hash

                await PandoraPay.store.storeToken( hash, tokenData  )

                commit('setToken',token)

                resolve(token)
            }catch(err){
                reject(err)
            } finally{
                delete promises[hash]
            }
        })
    }

}
