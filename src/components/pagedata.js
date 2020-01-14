import { useStaticQuery, graphql } from "gatsby"

export const useDesignerData = () => {
    const { contentfulPage } = useStaticQuery(
      graphql`
        query designerDataQuery {
            contentfulPage(key: {eq: "designer"}) {
                short     
            }
        }
      `
    )
    return contentfulPage
}