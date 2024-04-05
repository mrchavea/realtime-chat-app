// import prisma from "../../../prisma";
// import { randomUUID } from "crypto";

// var RESULTS_LIMIT = 15;

// export const GarageFindAll = async (query, filter) => {
//   const QUERY = {
//     take: RESULTS_LIMIT
//   };
//   if (query || filter) {
//     QUERY.where = {};
//     if (query)
//       QUERY.where["name"] = {
//         contains: query,
//         mode: "insensitive"
//       };
//     if (filter)
//       QUERY.where["services"] = {
//         hasSome: [filter]
//       };
//   }
//   return await prisma.garage.findMany(QUERY);
// };

// export const GaragesFindByCitySlug = async (
//   citySlug,
//   filter,
//   offsetPagination
// ) => {
//   //TO DO: WORK with pagination
//   const QUERY = {
//     take: RESULTS_LIMIT,
//     where: {
//       citySlug: citySlug
//     }
//   };
//   if (filter)
//     QUERY.where["services"] = {
//       hasSome: [filter]
//     };
//   if (offsetPagination) QUERY.skip = offsetPagination * RESULTS_LIMIT;
//   console.log("QUERY", QUERY);
//   try {
//     return await prisma.garage.findMany(QUERY);
//   } catch (err) {
//     console.log("ERRR", err);
//   }
// };

// export const GarageFindBySlug = async (slug) =>
//   await prisma.garage.findUniqueOrThrow({
//     where: {
//       slug: slug
//     }
//   });

// // export const GarageFindByQueryAndFilter = async (query, filter) => {
// //   const QUERY = {
// //     take: RESULTS_LIMIT,
// //     where: {
// //       name: {
// //         contains: query,
// //         mode: "insensitive"
// //       }
// //     }
// //   };
// //   if (filter)
// //     QUERY.where["services"] = {
// //       hasSome: [filter]
// //     };
// //   return await prisma.garage.findMany(QUERY);
// // };

// export const GarageFindBySlugWithRates = async (slug) =>
//   await prisma.garage.findUniqueOrThrow({
//     where: {
//       slug: slug
//     },
//     include: {
//       rating: true
//     }
//   });

// export const GarageFindBySlugWithRatesAndComments = async (slug) =>
//   await prisma.garage.findUniqueOrThrow({
//     where: {
//       slug: slug
//     },
//     include: {
//       rating: true,
//       comments: true
//     }
//   });

// export function organizeCommentsAndReplies(comments) {
//   const commentsMap = new Map();
//   const organizedComments = [];

//   // Primera pasada: crear la estructura básica de comments
//   comments.forEach((comment) => {
//     comment.replies = [];
//     commentsMap.set(comment.id, comment);
//     organizedComments.push(comment);
//   });

//   // Segunda pasada: organizar las replies en los comments originales
//   organizedComments.forEach((comment) => {
//     if (comment.replyCommentId) {
//       const replyComment = commentsMap.get(comment.replyCommentId);
//       if (replyComment) {
//         comment.replies.push(replyComment);
//       }
//     }
//   });

//   return organizedComments;
// }

// export const GarageGetCommentsIfAny = async (slug) => {
//   try {
//     return await prisma.comment.findMany({
//       where: {
//         garageId: slug
//       },
//       orderBy: { date: "desc" },
//       include: {
//         author: {
//           select: {
//             name: true,
//             image: true
//           }
//         },
//         answerer: {
//           select: {
//             name: true,
//             image: true
//           }
//         }
//       }
//     });
//   } catch (err) {
//     console.log("ERR", err);
//   }
// };

// export const GarageCreateReview = async (slug, reviewData, user) => {
//   try {
//     const today = new Date();
//     const garage = await GarageFindBySlugWithRates(slug);

//     const commentData = {
//       data: {
//         text: reviewData.comment,
//         title: reviewData.title,
//         date: today,
//         garage: {
//           connect: {
//             slug: garage.slug
//           }
//         },
//         author: {
//           connect: {
//             id: user.id
//           }
//         }
//       }
//     };
//     const ratingData = {
//       data: {
//         rate: reviewData.rating,
//         garage: {
//           connect: {
//             slug: garage.slug
//           }
//         },
//         user: {
//           connect: {
//             id: user.id
//           }
//         }
//       }
//     };

//     const garageData = {
//       where: {
//         slug: slug
//       },
//       data: {
//         averageRating: GarageCalculateRating(garage, reviewData.rating),
//         reviews: garage.reviews + 1
//       }
//     };

//     const [comment, rating, updatedGarage] = await prisma.$transaction([
//       prisma.comment.create(commentData),
//       prisma.rating.create(ratingData),
//       prisma.garage.update(garageData)
//     ]);
//     if (!updatedGarage) throw new Error("Error creating the review");
//     return updatedGarage;
//   } catch (error) {
//     console.log("REVIER ERRO", error);
//   }
// };

// export const GarageCalculateRating = (garage, newRate = null) => {
//   try {
//     const ratingLength = newRate
//       ? garage.rating.length + 1
//       : garage.rating.length;
//     if (!ratingLength > 0) return null;
//     let sum = garage.rating.reduce((accumulator, currentRate) => {
//       return accumulator + currentRate.rate;
//     }, 0);
//     return newRate ? (sum + newRate) / ratingLength : sum / ratingLength;
//   } catch (error) {
//     return null;
//   }
// };

// export const GarageCreateCommentReply = async (slug, replyData, admin) => {
//   try {
//     console.log("reply data -> ", replyData);
//     const today = new Date();
//     const replyCommentId = randomUUID();

//     const commentData = {
//       data: {
//         id: replyCommentId,
//         text: replyData.comment,
//         date: today,
//         garage: {
//           connect: {
//             slug: slug
//           }
//         },
//         answerer: {
//           connect: {
//             id: admin.id
//           }
//         }
//       }
//     };

//     const originalCommentData = {
//       where: {
//         id: replyData.originalCommentId
//       },
//       data: {
//         reply: {
//           connect: { id: replyCommentId }
//         }
//       }
//     };

//     const [reply, originalComment] = await prisma.$transaction([
//       prisma.comment.create(commentData),
//       prisma.comment.update(originalCommentData)
//     ]);

//     console.log("ALL", reply, originalComment);

//     if (!reply || !originalComment) throw new Error("Error creating the reply");
//     return reply;
//   } catch (error) {
//     console.log("CREATING REPLY", error);
//   }
// };
