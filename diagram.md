<!-- Vì hạn chế thời gian, nên tôi đã rút gọn một số phần và chọn cách triển khai đơn giản hơn trong thực tế. -->


+----------------+        +----------------+        +------------------+
|      User      |        |     Comment    |        |   CommentMedia   |
+----------------+        +----------------+        +------------------+
| _id: ObjectId  | 1---*  | _id: ObjectId  | *---1  | _id: ObjectId    |
| username: Str  |        | userID: Ref    |        | mediaType: Str   |
| password: Str  |        | stormID: Ref   |        | mediaURL: Str    |
| ...            |        | content: Str   |        +------------------+
+----------------+        | left: Number   |        
        |                 | right: Number  |
        | *---1           | parentID: Ref |       
        |                 | isdeleted: Bool|        
+----------------+        | media: Ref    |        
|     Storm      |        +----------------+        
+----------------+                 |                  
| _id: ObjectId  |         1---*   |                       
| cityName: Str  |                 |                  
| affectedAreas: |                 |                  
|    Number      |                 |                  
| detectedTime:  |                 |                  
|    Date        |                 |                 
| comments: [Ref]|+----------------                 
+----------------+                 
                                          
        
