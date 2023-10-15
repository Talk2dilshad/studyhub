export default function GetAvgRating(stars){
    if(stars?.length === 0) return 0

    const totalReviewCount = stars?.reduce((acc,curr) => {
        acc += curr.rating;
        return acc;
    },0);

    const multiplier = Math.pow(10,1);
    const avgReviewCount = Math.round((totalReviewCount/stars?.length)*multiplier)/multiplier;

    return avgReviewCount;//no. of stars
}