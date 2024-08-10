import { memo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default memo(function PageTitle({ title }) {

    const location = useLocation()

    useEffect(() => {
        document.title = title
    }, [location, title])

    return null;
})