import { Space, Spin, Typography } from 'antd'
import React, { Suspense } from 'react'
import PostCreate from './Post/PostCreate'
import Posts from './Post/Posts'
import PopularTrends from './PopularTrands'
import FollowSuggest from './FollowerSuggest'



const HomePage = () => {
    return (
        <div>
            <div className='flex justify-between gap-4'>
                <div className='flex-1 flex flex-col gap-4 max-h-[88vh] overflow-y-auto max-w-screen-sm mx-auto pb-16'>
                    {/* post generator on top */}
                   <PostCreate/>
                    {/* posts */}
                    <Posts />
                </div>

                <div className='flex-[0.4] hidden md:flex flex-col gap-4 max-w-[25rem'>
                    <Suspense
                        fallback={
                            <Space direction="vertical">
                                <Spin />
                                <Typography className="typoH4">Loading trends...</Typography>
                            </Space>
                        }
                    >
                        <PopularTrends />
                    </Suspense>

                    <FollowSuggest/>
                </div>
            </div>
        </div>
    )
}

export default HomePage