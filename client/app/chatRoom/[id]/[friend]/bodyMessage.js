import { View, Text, ScrollView } from "react-native";
import React from "react";

import LeftTextMessage from "../../../../components/leftTextMessage";
import RightTextMessage from "../../../../components/rightTextMessage";
import LeftFileMessage from "../../../../components/leftFileMessage";
import RightFileMessage from "../../../../components/rightFileMessage";

const BodyMessage = ({ messagesList, sendMessageError, username }) => {
//   console.log(messagesList);
  return (
    <ScrollView className="bg-[#FFF9E2] pt-8" style={{ flex: 1 }}>
      {messagesList.map((mess) => (
        <View key={mess.id}>
          {mess.sender.match(username) ? (
            <View>
              {mess.type == "file" ? (
                <RightFileMessage
                  fileName={mess.fileName}
                  cypherFileName={mess.fileNameCipher}
                  url={mess.url}
                  urlCipher={mess.urlCipher}
                />
              ) : (
                <RightTextMessage message={mess.message} cipher={mess.cipher} />
              )}
            </View>
          ) : (
            <View key={mess.id}>
              {mess.type == "file" ? (
                <LeftFileMessage
                  fileName={mess.fileName}
                  cypherFileName={mess.fileNameCipher}
                  url={mess.url}
                  urlCipher={mess.urlCipher}
                />
              ) : (
                <LeftTextMessage message={mess.message} cipher={mess.cipher} />
              )}
            </View>
          )}
        </View>
      ))}

      <Text className="text-[#BC4B48] mt-1">{sendMessageError}</Text>
    </ScrollView>
  );
};

export default BodyMessage;
