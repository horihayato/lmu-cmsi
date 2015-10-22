#algorithm from http://blog.yhathq.com/posts/naive-bayes-in-python.html
import sys
import re
import string
import math

def remove_punctuation(s):
    exclude = set(string.punctuation)
    return ''.join(ch for ch in s if ch not in exclude)

def tokenize(text):
    text = remove_punctuation(text)
    text = text.lower()
    return re.split("\W+", text)

def count_words(words):
    wc = {}
    for word in words:
        wc[word] = wc.get(word, 0.0) + 1.0
    return wc


posInput = sys.argv[1].split(",")
negInput = sys.argv[2].split(",")
descripInput = sys.argv[3]

#training
vocab = {}
word_counts = {
    "pos": {},
    "neg": {}
}
priors = {
    "pos": 0.,
    "neg": 0.
}
docs = []
for text in posInput:
    priors["pos"] += 1
    words = tokenize(text)
    counts = count_words(words)
    for word, count in list(counts.items()):
        if len(word) <= 6: #ignores words less than 6 chars
            continue
        # if we haven't seen a word yet, let's add it to our dictionaries with a count of 0
        if word not in vocab:
            vocab[word] = 0.0  # use 0.0 here so Python does "correct" math
        if word not in word_counts["pos"]:
            word_counts["pos"][word] = 0.0
        vocab[word] += count
        word_counts["pos"][word] += count

for text in negInput:
    priors["neg"] += 1
    words = tokenize(text)
    counts = count_words(words)
    for word, count in list(counts.items()):
        if len(word) <= 6:
            continue
        if word not in vocab:
            vocab[word] = 0.0
        if word not in word_counts["neg"]:
            word_counts["neg"][word] = 0.0
        vocab[word] += count
        word_counts["neg"][word] += count



#application
words = tokenize(descripInput)
counts = count_words(words)

prior_pos = (priors["pos"] / sum(priors.values()))
prior_neg = (priors["neg"] / sum(priors.values()))

log_prob_neg = 0.0
log_prob_pos = 0.0
for w, cnt in list(counts.items()):
    # skip words that we haven't seen before, or words less than 3 letters long
    if w not in vocab or len(w) <= 3:
        continue

    p_word = vocab[w] / sum(vocab.values())
    p_w_given_pos = word_counts["pos"].get(w, 0.0) / sum(word_counts["pos"].values())
    p_w_given_neg = word_counts["neg"].get(w, 0.0) / sum(word_counts["neg"].values())

    if p_w_given_pos > 0:
        log_prob_pos += math.log(cnt * p_w_given_pos/ p_word)
    if p_w_given_neg > 0:
        log_prob_neg += math.log(cnt * p_w_given_neg / p_word)


print(math.exp(log_prob_pos + math.log(prior_pos))) #Chance Positive
print(math.exp(log_prob_neg + math.log(prior_neg))) #Chance Negative
print word_counts["pos"]
print word_counts["neg"]

