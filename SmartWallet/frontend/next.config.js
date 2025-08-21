/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'https://9vzfs98vfb.execute-api.us-west-2.amazonaws.com/prod/login'
      },
      {
        source: '/api/nearby-offers',
        destination: 'https://9vzfs98vfb.execute-api.us-west-2.amazonaws.com/prod/nearby-offers'
      }
    ]
  }
}

module.exports = nextConfig