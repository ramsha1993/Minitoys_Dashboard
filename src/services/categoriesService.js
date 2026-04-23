import api from "../api/axiosinterceptor"
import ENDPOINTS from "../utils/ENDPOINTS"
export const FetchCategory = async () => {
    try {
        const response = await api.get({ url: `${ENDPOINTS.OTHER.CATEGORY}/all` })
        return response
    }
    catch (error) {
        throw error
    }
}